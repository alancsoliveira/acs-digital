import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function AllPeople() {
    const [people, setPeople] = useState([]);
    const [totalFamilies, setTotalFamilies] = useState(0);
    const [totalPeople, setTotalPeople] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetails(person) {
        navigation.navigate('DetailPerson', { person });
    }

    function navigateToFamilies() {
        navigation.navigate('Families');
    }

    async function loadFamilies() {
        const response = await api.get('family');

        setTotalFamilies(response.headers['x-total-count']);
    }

    async function loadPeople() {
        if (loading) {
            return;
        }

        if (totalPeople > 0 && people.length === totalPeople) {
            return;
        }

        setLoading(true);

        const response = await api.get('person', { params: { page } });


        setPeople([...people, ...response.data]);
        setTotalPeople(response.headers['x-total-count']);
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
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigateToFamilies()}
                    >
                        <Text style={styles.headerText}>
                            Total de <Text style={styles.headerTextBold}>{totalFamilies} famílias</Text>.
                        </Text>

                    </TouchableOpacity>

                    <Text style={[styles.headerText, { color: "#0078c8" }]}>
                        Total de <Text style={styles.headerTextBold}>{totalPeople} pessoas</Text>.
                    </Text>

                </View>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um integrante abaixo para ver mais detalhes.</Text>

            <FlatList
                data={people}
                style={styles.PeopleList}
                keyExtractor={people => String(people.person_id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadPeople}
                onEndReachedThreshold={0.2}
                renderItem={({ item: person }) => (
                    <View style={styles.person}>
                        <Text style={styles.personProperty}>NOME COMPLETO</Text>
                        <Text style={styles.personValue}>{person.name}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetails(person)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="user" size={17} color="#0078c8" />
                        </TouchableOpacity>

                    </View>
                )}
            />

        </View>
    );
}