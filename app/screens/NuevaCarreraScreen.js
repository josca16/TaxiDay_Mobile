import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CarrerasContext } from '../context/CarrerasContext';
import { AppContext } from '../context/AppContext'; // Import AppContext
import { MaterialIcons } from '@expo/vector-icons'; // Import icons for better UI

export default function NuevaCarreraScreen({ navigation }) {
  const { addCarrera } = useContext(CarrerasContext);
  const { lightMode } = useContext(AppContext); // Access lightMode
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [precio, setPrecio] = useState('');
  const [kilometros, setKilometros] = useState('');

  const handleAddCarrera = () => {
    addCarrera(origen, destino, parseFloat(precio), parseFloat(kilometros));
    navigation.goBack();
  };

  return (
    <View style={[styles.container, lightMode && styles.lightContainer]}>
      <Text style={[styles.title, lightMode && styles.lightTitle]}>Nueva Carrera</Text>
      <View style={[styles.inputContainer, lightMode && styles.lightInputContainer]}>
        <MaterialIcons name="location-on" size={24} color="#D4A017" />
        <TextInput
          style={[styles.input, lightMode && styles.lightInput]}
          placeholder="Origen"
          placeholderTextColor="#999"
          value={origen}
          onChangeText={setOrigen}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="flag" size={24} color="#D4A017" />
        <TextInput
          style={styles.input}
          placeholder="Destino"
          placeholderTextColor="#999"
          value={destino}
          onChangeText={setDestino}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="attach-money" size={24} color="#D4A017" />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          placeholderTextColor="#999"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
          returnKeyType="done" // Add this line
          blurOnSubmit={true}  // Add this line
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="speed" size={24} color="#D4A017" />
        <TextInput
          style={styles.input}
          placeholder="Kilómetros"
          placeholderTextColor="#999"
          value={kilometros}
          onChangeText={setKilometros}
          keyboardType="numeric"
          returnKeyType="done" // Add this line
          blurOnSubmit={true}  // Add this line
        />
      </View>
      <TouchableOpacity style={[styles.button, lightMode && styles.lightButton]} onPress={handleAddCarrera}>
        <Text style={styles.buttonText}>Agregar Carrera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 28,
    color: '#D4A017',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lightTitle: {
    color: '#FF8C00',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  lightInputContainer: {
    backgroundColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
  },
  lightInput: {
    color: '#000',
  },
  button: {
    backgroundColor: '#D4A017',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  lightButton: {
    backgroundColor: '#FF8C00',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});