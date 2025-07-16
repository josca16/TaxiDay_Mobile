import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {
  const { lightMode, fullName, setFullName, phoneNumber, setPhoneNumber } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [licencia, setLicencia] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const { fullName, email, phoneNumber, licencia } = JSON.parse(userData);
        setFullName(fullName);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        setLicencia(licencia);
      }
    };
    loadUserData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem('user', JSON.stringify({ fullName, email, phoneNumber, licencia }));
    alert('Perfil actualizado');
  };

  return (
    <View style={[styles.container, lightMode && styles.lightContainer]}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/Captura.jpg')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Campo: Nombre */}
      <View style={[styles.inputContainer, lightMode && styles.lightInputContainer]}>
        <Text style={[styles.label, lightMode && styles.lightText]}>Nombre</Text>
        <TextInput 
          style={[styles.input, lightMode && styles.lightInput]} 
          value={fullName} 
          onChangeText={setFullName} 
        />
      </View>

      {/* Campo: Correo (Editable) */}
      <View style={[styles.inputContainer, lightMode && styles.lightInputContainer]}>
        <Text style={[styles.label, lightMode && styles.lightText]}>Correo Electrónico</Text>
        <TextInput 
          style={[styles.input, lightMode && styles.lightInput]} 
          value={email} 
          onChangeText={setEmail}
        />
      </View>

      {/* Campo: Teléfono */}
      <View style={[styles.inputContainer, lightMode && styles.lightInputContainer]}>
        <Text style={[styles.label, lightMode && styles.lightText]}>Teléfono</Text>
        <TextInput 
          style={[styles.input, lightMode && styles.lightInput]} 
          value={phoneNumber} 
          onChangeText={setPhoneNumber} 
          keyboardType="phone-pad"
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>

      {/* Campo: Licencia */}
      <View style={[styles.inputContainer, lightMode && styles.lightInputContainer]}>
        <Text style={[styles.label, lightMode && styles.lightText]}>Licencia</Text>
        <TextInput 
          style={[styles.input, lightMode && styles.lightInput]} 
          value={licencia} 
          onChangeText={setLicencia} 
        />
      </View>

      {/* Botón de Guardar Cambios */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* Botón para Volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    paddingTop: 40, // Increase top padding to move content down
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#D4A017',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#D4A017',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  lightInputContainer: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
  },
  label: {
    color: '#FFF',
    fontSize: 15, // Slightly reduced font size
    marginBottom: 5,
  },
  lightText: {
    color: '#000',
    fontSize: 15, // Slightly reduced font size
  },
  saveButtonText: {
    color: '#000',
    fontSize: 15, // Slightly reduced font size
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#1E90FF',
    fontSize: 13, // Slightly reduced font size
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
  },
  lightInput: {
    backgroundColor: '#FFF',
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#D4A017',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: '#1E90FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
