import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import { CarrerasContext } from '../context/CarrerasContext'; // Import CarrerasContext
import * as FileSystem from 'expo-file-system'; // Import FileSystem
import * as Sharing from 'expo-sharing'; // Import Sharing
import * as Location from 'expo-location'; // Import Location
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker

export default function SettingsScreen({ navigation }) {
  const { lightMode, setLightMode } = useContext(AppContext);
  const { jornadas } = useContext(CarrerasContext); // Access jornadas
  const [errorMessage, setErrorMessage] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    if (locationEnabled) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    } else {
      setLocation(null);
    }
  }, [locationEnabled]);

  const downloadJornadas = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'jornadas.json';
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(jornadas, null, 2));

      // Use Sharing to share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert('Sharing is not available on this device');
      }
    } catch (error) {
      setErrorMessage(`❌ Error al descargar: ${error.message}`);
    }
  };

  return (
    <View style={[styles.container, lightMode && styles.lightContainer]}>
      {/* Location Toggle */}
      <View style={[styles.settingBlock, lightMode && styles.lightBlock]}>
        <Text style={[styles.settingText, lightMode && styles.lightSettingText]}>Ubicación Activada</Text>
        <Switch 
          value={locationEnabled} 
          onValueChange={setLocationEnabled} 
          thumbColor={locationEnabled ? "#000" : "#D4A017"}
          trackColor={{ false: "#444", true: "#D4A017" }}
        />
      </View>

      {/* Geolocation Section */}
      {locationEnabled && location && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación Actual</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
            />
          </MapView>
        </View>
      )}

      {/* Bloque: Modo Claro */}
      <View style={[styles.settingBlock, lightMode && styles.lightBlock]}>
        <Text style={[styles.settingText, lightMode && styles.lightSettingText]}>Modo Claro</Text>
        <Switch 
          value={lightMode} 
          onValueChange={setLightMode} 
          thumbColor={lightMode ? "#000" : "#D4A017"}
          trackColor={{ false: "#444", true: "#D4A017" }}
        />
      </View>

      {/* Download Jornadas Section */}
      <View style={[styles.section, lightMode && styles.lightSection]}>
        <Text style={[styles.sectionTitle, lightMode && styles.lightSectionTitle]}>📁 Descargar Jornadas</Text>
        <TouchableOpacity style={[styles.uploadButton, lightMode && styles.lightUploadButton]} onPress={downloadJornadas}>
          <Text style={[styles.buttonText, lightMode && styles.lightButtonText]}>📥 Descargar Datos</Text>
        </TouchableOpacity>

        {errorMessage && <Text style={[styles.errorText, lightMode && styles.lightErrorText]}>{errorMessage}</Text>}
      </View>

      {/* Remove the Acerca de Section */}
      
      {/* Botón para Cerrar Sesión */}
      <TouchableOpacity 
        style={[styles.logoutButton, lightMode && styles.lightLogoutButton]} 
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* Botón para Volver a Home */}
      <TouchableOpacity style={[styles.button, lightMode && styles.lightButton]} onPress={() => navigation.navigate('Inicio')}>
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  settingBlock: {
    width: '100%',
    backgroundColor: '#292929',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  lightBlock: {
    backgroundColor: '#E0E0E0',
  },
  settingText: {
    fontSize: 15,
    color: '#FFF',
  },
  lightSettingText: {
    color: '#000',
  },
  section: {
    width: '100%',
    marginVertical: 10,
  },
  lightSection: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lightSectionTitle: {
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#FFF',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4A017',
  },
  uploadButton: {
    backgroundColor: '#D4A017',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  lightUploadButton: {
    backgroundColor: '#D4A017',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButtonText: {
    color: '#000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 5,
  },
  lightErrorText: {
    color: '#B22222',
  },
  uploadedFileText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
  },
  lightUploadedFileText: {
    color: '#000',
  },
  noFileText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
  },
  lightNoFileText: {
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  lightLogoutButton: {
    backgroundColor: '#8B0000',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#D4A017',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  lightButton: {
    backgroundColor: '#333',
  },
  aboutSection: {
    backgroundColor: '#292929',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  lightAboutSection: {
    backgroundColor: '#E0E0E0',
  },
  aboutTitle: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lightAboutTitle: {
    color: '#333',
  },
  aboutText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  lightAboutText: {
    color: '#000',
  },
  aboutButton: {
    backgroundColor: '#D4A017',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  aboutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
