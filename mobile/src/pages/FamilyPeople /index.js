import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function FamilyPeople() {
    const [people, setPeople] = useState([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();
    const route = useRoute();

    const familyId = route.params.familyId;
    const responsible_name = route.params.responsible_name;
    const name = responsible_name.split(' ');

    function navigateGoBack() {
        navigation.goBack();
    }

    function navigateToDetails(person) {
        navigation.navigate('DetailPerson', { person });
    }

    async function loadPeople() {
        const response = await api.get('profile', {
            headers: {
                Authorization: familyId,
            }
        });
        setPeople(response.data);
        setTotal(response.headers['x-total-count'])
    }

    useEffect(() => {
        loadPeople();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} pessoas</Text>.
                </Text>

            </View>

            <TouchableOpacity style={styles.goBack} onPress={navigateGoBack}>
                <Feather name="arrow-left" size={28} color="#0078c8" />
            </TouchableOpacity>
            <Text style={styles.title}>Bem vindo a família de <Text style={styles.headerTextBold}>{name[0]} {name[1]}</Text>.</Text>
            <Text style={styles.description}>Escolha um integrante abaixo para ver mais detalhes.</Text>

            <FlatList
                data={people}
                style={styles.PeopleList}
                keyExtractor={people => String(people.id)}
                showsVerticalScrollIndicator={true}
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