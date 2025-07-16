import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CarrerasContext } from '../context/CarrerasContext';
import { AppContext } from '../context/AppContext'; // Import AppContext

export default function EditCarreraScreen({ route, navigation }) {
  const { carrera } = route.params;
  const { updateCarrera } = useContext(CarrerasContext);
  const { lightMode } = useContext(AppContext); // Access lightMode

  const [origen, setOrigen] = useState(carrera.origen);
  const [destino, setDestino] = useState(carrera.destino);
  const [precio, setPrecio] = useState(carrera.precio.toString());
  const [kilometros, setKilometros] = useState(carrera.kilometros.toString());

  const handleUpdateCarrera = () => {
    updateCarrera(carrera.id, origen, destino, parseFloat(precio), parseFloat(kilometros));
    navigation.goBack();
  };

  return (
    <View style={[styles.container, lightMode && styles.lightContainer]}>
      <Text style={[styles.title, lightMode && styles.lightTitle]}>Editar Carrera</Text>
      <TextInput
        style={styles.input}
        placeholder="Origen"
        value={origen}
        onChangeText={setOrigen}
      />
      <TextInput
        style={styles.input}
        placeholder="Destino"
        value={destino}
        onChangeText={setDestino}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Kilómetros"
        value={kilometros}
        onChangeText={setKilometros}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateCarrera}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
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
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 14, // Reduced font size
    borderWidth: 1,
    borderColor: '#555',
  },
  button: {
    backgroundColor: '#D4A017',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#D4A017',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  menuButtonText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: 'bold',
  },
});