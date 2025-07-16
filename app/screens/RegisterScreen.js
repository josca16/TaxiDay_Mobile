import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [licencia, setLicencia] = useState(''); // Add state for licencia
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = async () => {
    if (isChecked) {
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify({ fullName, email, password, phoneNumber, licencia }));
      alert('Cuenta Creada');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Nombre Completo" 
          placeholderTextColor="#bbb"
          value={fullName} 
          onChangeText={setFullName} 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Correo Electrónico" 
          placeholderTextColor="#bbb"
          keyboardType="email-address"
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
        
        <TextInput 
          style={styles.input} 
          placeholder="Teléfono" 
          placeholderTextColor="#bbb"
          keyboardType="phone-pad"
          value={phoneNumber} 
          onChangeText={setPhoneNumber} 
          returnKeyType="done" // Add this line
          blurOnSubmit={true}  // Add this line
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Licencia" 
          placeholderTextColor="#bbb"
          value={licencia} 
          onChangeText={setLicencia} 
        />

        {/* Contenedor del Checkbox y Texto */}
        <View style={styles.checkboxWrapper}>
          <BouncyCheckbox 
            isChecked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            marginLeft={120} // Alinea el checkbox con el texto
            marginBottom={12} // Separa el checkbox del texto
            fillColor="#4CAF50"
            unfillColor="#222"
            innerIconStyle={{ borderWidth: 2 }}
            size={20}
            style={{ alignSelf: 'flex-start' }} // Evita problemas de alineación
          />
          <Text style={styles.checkboxText}>
            Acepto los{' '}
            <Text style={styles.linkText} onPress={() => alert('Abrir Términos y Condiciones')}>
              Términos y Condiciones
            </Text>
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, !isChecked && styles.disabledButton]} 
          onPress={handleRegister}
          disabled={!isChecked}
        >
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#D4A017',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  form: {
    width: '100%',
    backgroundColor: '#292929',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#333',
    color: '#fff',
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    marginLeft: 50, // Alinea el checkbox con el texto
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 15,
    paddingHorizontal: 1,
    flexWrap: 'wrap', // Permite que el texto baje de línea si es necesario
  },
  checkboxText: {
    color: '#fff',
    fontSize: 14,
    flexShrink: 1, // Asegura que no se desborde
    marginLeft: 8,
    maxWidth: '85%', // Evita que se salga de la pantalla
  },
  linkText: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#D4A017',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
  },
});
