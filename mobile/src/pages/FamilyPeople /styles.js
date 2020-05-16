import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },


    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        fontSize: 15,
        color: '#737380',
    },


    headerTextBold: {
        fontWeight: 'bold',
    },

    title: {
        fontSize: 16,
        marginTop: 16,
        color: '#737380',
    },

    description: {
        marginTop: 12,
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
    },

    goBack: {
        marginLeft: '92%'
    },

    PeopleList: {
        marginTop: 32,
    },

    person: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    personProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',

    },

    personValue: {
        marginTop: 4,
        fontSize: 15,
        marginBottom: 8,
        color: '#737380',
    },

    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    detailsButtonText: {
        color: '#0078c8',
        fontSize: 15,
        fontWeight: 'bold',
    },

});