import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CarrerasContext } from '../context/CarrerasContext';
import { AppContext } from '../context/AppContext'; // Import AppContext
import { TouchableOpacity } from 'react-native'; // Import TouchableOpacity

export default function RegistrosScreen({ navigation }) {
  const { jornadas } = useContext(CarrerasContext);
  const { lightMode } = useContext(AppContext); // Access lightMode

  return (
    <View style={[styles.container, lightMode && styles.lightContainer]}>
      <Text style={[styles.title, lightMode && styles.lightTitle]}>Jornadas</Text>
      <ScrollView>
        {jornadas.map((jornada) => (
          <TouchableOpacity
            key={jornada.id}
            onPress={() => navigation.navigate('JornadaDetail', { jornada })}
          >
            <View style={[styles.jornadaContainer, lightMode && styles.lightJornadaContainer]}>
              <Text style={[styles.jornadaTitle, lightMode && styles.lightJornadaTitle]}>Jornada {jornada.id}</Text>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Origen</Text>
                <Text style={styles.tableHeaderText}>Destino</Text>
                <Text style={styles.tableHeaderText}>Km</Text>
                <Text style={styles.tableHeaderText}>Precio</Text>
              </View>
              {jornada.carreras.map((carrera) => (
                <View key={carrera.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{carrera.origen}</Text>
                  <Text style={styles.tableCell}>{carrera.destino}</Text>
                  <Text style={styles.tableCell}>{carrera.kilometros}</Text>
                  <Text style={styles.tableCell}>{carrera.precio}€</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 26,
    color: '#D4A017',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  lightTitle: {
    color: '#D4A017',
  },
  jornadaContainer: {
    backgroundColor: '#292929',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  lightJornadaContainer: {
    backgroundColor: '#E0E0E0',
  },
  jornadaTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  lightJornadaTitle: {
    color: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeaderText: {
    color: '#D4A017',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableCell: {
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
  },
});
// Ensure the StyleSheet object is properly closed