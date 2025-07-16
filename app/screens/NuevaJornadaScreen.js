import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { AppContext } from '../context/AppContext';
import { CarrerasContext } from '../context/CarrerasContext'; // Import the CarrerasContext
import { MaterialIcons } from '@expo/vector-icons'; // Importamos iconos

export default function NuevaJornadaScreen({ navigation }) {
  const { lightMode } = useContext(AppContext);
  const { carreras, finalizeJornada } = useContext(CarrerasContext); // Use finalizeJornada

  const totalGanancias = carreras.reduce((sum, carrera) => sum + carrera.precio, 0);
  const totalKilometros = carreras.reduce((sum, carrera) => sum + carrera.kilometros, 0); // Sum kilometers

  return (
    <SafeAreaView style={[styles.container, lightMode && styles.lightContainer]}>
      <Text style={[styles.title, lightMode && styles.lightTitle]}>Jornada Actual</Text>

      <View style={[styles.carrerasContainer, lightMode && styles.lightCarrerasContainer]}>
        <Text style={[styles.subtitle, lightMode && styles.lightSubtitle]}>Carreras de hoy:</Text>
        <ScrollView style={styles.carrerasList}>
          {carreras.map((carrera) => (
            <View key={carrera.id} style={[styles.carreraItem, lightMode && styles.lightCarreraItem]}>
              <View style={styles.carreraHeader}>
                <MaterialIcons name="directions-car" size={20} color="#D4A017" />
                <Text style={[styles.carreraText, lightMode && styles.lightText]}>
                  De: {carrera.origen} a {carrera.destino} - {carrera.kilometros} km
                </Text>
              </View>
              <Text style={styles.carreraPrecio}>
                <MaterialIcons name="attach-money" size={16} color="#D4A017" /> {carrera.precio}€
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.resumenContainer, lightMode && styles.lightResumenContainer]}>
        <Text style={[styles.subtitle, lightMode && styles.lightSubtitle]}>Resumen de Jornada:</Text>
        <View style={styles.resumenContent}>
          <View style={styles.resumenItem}>
            <MaterialIcons name="speed" size={20} color="#D4A017" />
            <Text style={[styles.resumenText, lightMode && styles.lightText]}>
              {totalKilometros} km
            </Text>
          </View>
          <View style={styles.resumenItem}>
            <MaterialIcons name="attach-money" size={20} color="#D4A017" />
            <Text style={[styles.resumenText, lightMode && styles.lightText]}>
              {totalGanancias}€
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, lightMode && styles.lightButton]}
        onPress={() => navigation.navigate('NuevaCarrera')}
      >
        <Text style={styles.buttonText}>Nueva Carrera</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.cancelButton, lightMode && styles.lightCancelButton]}
        onPress={() => {
          finalizeJornada(); // Finalize the jornada
          navigation.goBack();
        }}
      >
        <Text style={[styles.cancelButtonText, lightMode && styles.lightCancelButtonText]}>
          Finalizar Jornada
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 35,
    paddingTop: 40,
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    color: '#D4A017', // Cambiado el color del título
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 60, // Ajustado la altura de línea para que se ajuste a la fuente
  },
  lightTitle: {
    color: '#FF8C00', // Color para el modo claro
  },
  subtitle: {
    fontSize: 18,
    color: '#D4A017', // Cambiado el color del subtítulo
    marginBottom: 8,
  },
  lightSubtitle: {
    color: '#FF8C00', // Color para el modo claro
  },
  lightText: {
    color: '#000',
  },
  carrerasContainer: {
    flex: 2,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  lightCarrerasContainer: {
    backgroundColor: '#E0E0E0',
  },
  carrerasList: {
    flex: 1,
  },
  carreraItem: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lightCarreraItem: {
    backgroundColor: '#FFF',
  },
  carreraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carreraText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 5,
  },
  carreraPrecio: {
    color: '#D4A017',
    fontWeight: 'bold',
  },
  resumenContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  lightResumenContainer: {
    backgroundColor: '#E0E0E0',
  },
  resumenContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  resumenItem: {
    alignItems: 'center',
  },
  resumenText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#D4A017',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    width: '90%',
    alignSelf: 'center',
  },
  lightButton: {
    backgroundColor: '#D4A017',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#D4A017',
    width: '90%',
    alignSelf: 'center',
  },
  lightCancelButton: {
    borderColor: '#D4A017',
  },
  cancelButtonText: {
    color: '#D4A017',
    fontSize: 16,
  },
  lightCancelButtonText: {
    color: '#D4A017',
  },
});
