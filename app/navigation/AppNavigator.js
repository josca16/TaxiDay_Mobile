import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DrawerNavigator from './DrawerNavigator'; // Menú lateral
import NuevaJornadaScreen from '../screens/NuevaJornadaScreen';
import ContinuarJornadaScreen from '../screens/ContinuarJornadaScreen';
import NuevaCarreraScreen from '../screens/NuevaCarreraScreen'; // Import NuevaCarreraScreen
import JornadaDetailScreen from '../screens/JornadaDetailScreen'; // Import the new screen
import EditCarreraScreen from '../screens/EditCarreraScreen'; // Import the new screen

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="NuevaJornada" component={NuevaJornadaScreen} />
        <Stack.Screen name="ContinuarJornada" component={ContinuarJornadaScreen} />
        <Stack.Screen name="NuevaCarrera" component={NuevaCarreraScreen} />
        <Stack.Screen name="JornadaDetail" component={JornadaDetailScreen} />
        <Stack.Screen name="EditCarrera" component={EditCarreraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
