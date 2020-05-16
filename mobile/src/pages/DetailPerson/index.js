import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Linking, Text, TouchableOpacity } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function DetailPerson() {
    const navigation = useNavigation();
    const route = useRoute();

    const person = route.params.person;
    const message = 'COMUNICADO DO ACS:'

    function navigateGoBack() {
        navigation.goBack()
    }

    function makeCall() {
        Linking.openURL(`tel://+55${person.phone}`)
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=+55${person.phone}&text=${message}\n`)
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: message,
            recipients: ['alancristian964@gmail.com'],
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity style={styles.goBack} onPress={navigateGoBack}>
                    <Feather name="arrow-left" size={28} color="#0078c8" />
                </TouchableOpacity>
            </View>

            <View style={styles.person}>
                <Text style={[styles.personProperty, { marginTop: 0 }]}>NOME COMPLETO</Text>
                <Text style={styles.personValue}>{person.name}</Text>

                <Text style={styles.personProperty}>GÊNERO</Text>
                <Text style={styles.personValue}>{person.genre}</Text>

                <Text style={styles.personProperty}>DATA DE NASCIMENTO</Text>
                <Text style={styles.personValue}>{person.birthday}</Text>

                <Text style={styles.personProperty}>CARTÃO DO SUS</Text>
                <Text style={styles.personValue}>{person.sus_card}</Text>
                
                <Text style={styles.personProperty}>TELEFONE</Text>
                <Text style={styles.personValue}>{person.phone}</Text>

                <Text style={styles.personProperty}>CONDIÇÃO DE SAÚDE</Text>
                <Text style={styles.personValue}>{person.health_condition}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.contactTitle}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={makeCall}>
                        <Text style={styles.actionText}>Telefone</Text>
                        <Feather style={styles.actionIcon} name='phone' size={17} color="#0078c8" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                        <Feather style={styles.actionIcon} name='message-circle' size={17} color="#0078c8" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                        <Feather style={styles.actionIcon} name='mail' size={17} color="#0078c8" />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}