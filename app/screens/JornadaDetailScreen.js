import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext'; // Import AppContext

export default function JornadaDetailScreen({ route, navigation }) {
  const { jornada } = route.params;
  const { lightMode } = useContext(AppContext); // Access lightMode

  return (
    <View style={[styles.container, lightMode && styles.lightContainer]}>
      <Text style={[styles.title, lightMode && styles.lightTitle]}>Detalles de la Jornada {jornada.id}</Text>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {jornada.carreras.map((carrera) => (
          <TouchableOpacity
            key={carrera.id}
            onPress={() => navigation.navigate('EditCarrera', { carrera })}
            style={styles.carreraContainer}
          >
            <Text style={styles.carreraText}>Origen: {carrera.origen}</Text>
            <Text style={styles.carreraText}>Destino: {carrera.destino}</Text>
            <Text style={styles.carreraText}>Kilómetros: {carrera.kilometros}</Text>
            <Text style={styles.carreraText}>Precio: {carrera.precio}€</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Adjust the position of the Inicio button */}
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.menuButtonText}>Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24, // Reduced font size
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  lightTitle: {
    color: '#FF8C00',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  carreraContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  carreraText: {
    color: '#FFF',
    fontSize: 16, // Reduced font size
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingBottom: 5,
  },
  menuButton: {
    backgroundColor: '#D4A017',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 45, // Adjust this value to move the button slightly up
  },
  menuButtonText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: 'bold',
  },
});