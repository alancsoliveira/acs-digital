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
        fontSize: 30,
        marginTop: 24,
        marginBottom: 16,
        color: '#13131a',
        fontWeight: 'bold',
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
    },

    familiesList:{
        marginTop: 32,
    },

    family:{
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom:16,
    },

    familyProperty:{
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        
    },

    familyValue:{
        marginTop: 4,
        fontSize: 15,
        marginBottom: 8,
        color: '#737380',
    },

    detailsButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    detailsButtonText:{
        color: '#0078c8',
        fontSize: 15,
        fontWeight: 'bold',
    },
});