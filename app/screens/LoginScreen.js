import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(userData);
      if (email === storedEmail && password === storedPassword) {
        alert('Login Successful');
        // Reset the navigation stack to prevent going back to the login screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        alert('Invalid Credentials');
      }
    } else {
      alert('No user registered');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#bbb"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#bbb"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#B8860B',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    backgroundColor: '#333',
    color: '#fff',
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  button: {
    backgroundColor: '#B8860B',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#1E90FF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});


// de ahi saco la base de datos, de esa libreria de react