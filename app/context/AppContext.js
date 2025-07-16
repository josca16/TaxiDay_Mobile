import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');

  // Cargar configuración al inicio
  useEffect(() => {
    const loadSettings = async () => {
      const savedMode = await AsyncStorage.getItem('lightMode');
      const savedName = await AsyncStorage.getItem('fullName');
      const savedPhone = await AsyncStorage.getItem('phoneNumber');
      const savedAge = await AsyncStorage.getItem('age');

      if (savedMode !== null) setLightMode(JSON.parse(savedMode));
      if (savedName) setFullName(savedName);
      if (savedPhone) setPhoneNumber(savedPhone);
      if (savedAge) setAge(savedAge);
    };

    loadSettings();
  }, []);

  // Guardar cuando cambian los valores
  useEffect(() => {
    AsyncStorage.setItem('lightMode', JSON.stringify(lightMode));
    AsyncStorage.setItem('fullName', fullName);
    AsyncStorage.setItem('phoneNumber', phoneNumber);
    AsyncStorage.setItem('age', age);
  }, [lightMode, fullName, phoneNumber, age]);

  return (
    <AppContext.Provider value={{ lightMode, setLightMode, fullName, setFullName, phoneNumber, setPhoneNumber, age, setAge }}>
      {children}
    </AppContext.Provider>
  );
};
