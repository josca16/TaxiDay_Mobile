import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HelpScreen from '../screens/HelpScreen';
import RegistrosScreen from '../screens/RegistrosScreen'; // Ensure this import is correct

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#222',
          width: 250,
        },
        headerStyle: {
          backgroundColor: '#2B2B2B',
        },
        headerTintColor: '#FFF',
        drawerActiveTintColor: '#D4A017',
        drawerInactiveTintColor: '#CCC',
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Ajustes" component={SettingsScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Ayuda" component={HelpScreen} />
      <Drawer.Screen name="Registros" component={RegistrosScreen} />
    </Drawer.Navigator>
  );
}
