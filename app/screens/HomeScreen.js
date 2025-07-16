import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Import Text here
import { AppContext } from '../context/AppContext';
import { CarrerasContext } from '../context/CarrerasContext'; // Import CarrerasContext
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for icons

export default function HomeScreen({ navigation }) {
  const { lightMode } = useContext(AppContext);
  const { jornadas } = useContext(CarrerasContext); // Access jornadas

  // Calculate total kilometers and earnings
  const totalKilometers = jornadas.reduce((total, jornada) => {
    return total + jornada.carreras.reduce((sum, carrera) => sum + carrera.kilometros, 0);
  }, 0);

  const totalEarnings = jornadas.reduce((total, jornada) => {
    return total + jornada.carreras.reduce((sum, carrera) => sum + carrera.precio, 0);
  }, 0);

  return (
    <View style={[styles.container, lightMode && styles.lightContainer]}>
      <View style={styles.topSection}>
        <Text style={[styles.title, lightMode && styles.lightText]}>TaxiDay</Text>
        <MaterialIcons name="directions-car" size={100} color="#B8860B" style={styles.carIcon} />
      </View>

      {/* Statistics Table */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Estadísticas de Jornadas</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Kilómetros Totales:</Text>
          <Text style={styles.statsValue}>{totalKilometers} km</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Dinero Ganado:</Text>
          <Text style={styles.statsValue}>{totalEarnings} €</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.button, lightMode && styles.lightButton]}
          onPress={() => navigation.navigate('NuevaJornada')}
        >
          <Text style={[styles.buttonText, lightMode && styles.lightButtonText]}>Nueva Jornada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, lightMode && styles.lightLogoutButton]}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40, // Adjust this value to ensure the title is not cut off
  },
  bottomSection: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 70,
  },
  title: {
    fontSize: 35,
    color: '#B8860B',
    fontWeight: 'bold',
    marginBottom: 60,
    // marginTop: -120, // Remove or adjust this if necessary
  },
  carIcon: {
    marginBottom: 20,
  },
  statsContainer: {
    backgroundColor: '#292929',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  statsTitle: {
    fontSize: 20,
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  statsLabel: {
    color: '#FFF',
    fontSize: 16,
  },
  statsValue: {
    color: '#D4A017',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#B8860B',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 80,
  },
  lightButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButtonText: {
    color: '#FFF',
  },
  logoutButton: {
    backgroundColor: '#4B0000',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
