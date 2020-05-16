import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Families() {
    const [families, setFamilies] = useState([]);
    const [totalFamilies, setTotalFamilies] = useState(0);
    const [totalPeople, setTotalPeople] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToFamily(family) {
        navigation.navigate('FamilyPeople', { familyId: family.id, responsible_name: family.responsible_name });
    }

    function navigateToPeople() {
        navigation.navigate('People');
    }

    async function loadPeople() {
        const response = await api.get('person');

        setTotalPeople(response.headers['x-total-count']);
    }

    async function loadFamilies() {
        if (loading) {
            return;
        }

        if (totalFamilies > 0 && families.length === totalFamilies) {
            return;
        }

        setLoading(true);

        const response = await api.get('family', { params: { page } });

        setFamilies([...families, ...response.data]);
        setTotalFamilies(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadFamilies();
        loadPeople();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <View >
                    <Text style={[styles.headerText, { color: "#0078c8" }]}>
                        Total de <Text style={styles.headerTextBold}>{totalFamilies} famílias</Text>.
                    </Text>
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigateToPeople()}
                    >
                        <Text style={styles.headerText}>
                            Total de <Text style={styles.headerTextBold}>{totalPeople} pessoas</Text>.
                        </Text>

                    </TouchableOpacity>

                </View>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha uma família abaixo para ver seus integrantes.</Text>

            <FlatList
                data={families}
                style={styles.familiesList}
                keyExtractor={families => String(families.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadFamilies}
                onEndReachedThreshold={0.2}
                renderItem={({ item: family }) => (
                    <View style={styles.family}>
                        <Text style={styles.familyProperty}>RESPONSÁVEL FAMILIAR</Text>
                        <Text style={styles.familyValue}>{family.responsible_name}</Text>

                        <Text style={styles.familyProperty}>ENDEREÇO</Text>
                        <Text style={styles.familyValue}>{family.neighborhood}</Text>

                        <Text style={styles.familyProperty}>NÚMERO</Text>
                        <Text style={styles.familyValue}>{family.number}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToFamily(family)}
                        >
                            <Text style={styles.detailsButtonText}>Ver composição famíliar</Text>
                            <Feather name="home" size={17} color="#0078c8" />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}