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

    headerTextBold: {
        fontWeight: 'bold',
    },


    person: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginTop: 24,
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

    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    contactTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#0078c8',
        lineHeight: 30,
    },

    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    action: {
        backgroundColor: '#0078c8',
        borderRadius: 8,
        height: 50,
        width: '32%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText:{
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },

    actionIcon:{
        color: '#FFF'
    }

});