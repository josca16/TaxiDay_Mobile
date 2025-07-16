import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import { AppProvider } from './app/context/AppContext';
import { CarrerasProvider } from './app/context/CarrerasContext'; // Import the CarrerasProvider

export default function App() {
  return (
    <AppProvider>
      <CarrerasProvider>
        <AppNavigator />
      </CarrerasProvider>
    </AppProvider>
  );
}
