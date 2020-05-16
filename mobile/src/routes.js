import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Families from './pages/Families';
import People from './pages/People';
import FamilyPeople from './pages/FamilyPeople ';
import DetailPerson from './pages/DetailPerson';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='Families' component={Families} />
                <AppStack.Screen name='People' component={People} />
                <AppStack.Screen name='FamilyPeople' component={FamilyPeople} />
                <AppStack.Screen name='DetailPerson' component={DetailPerson} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}