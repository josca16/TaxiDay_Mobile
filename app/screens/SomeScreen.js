import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import { CarrerasContext } from '../context/CarrerasContext';

export default function SomeScreen() {
  const { startNewJornada } = useContext(CarrerasContext);

  const handleStartNewJornada = () => {
    startNewJornada(); // Use startNewJornada instead of finalizarJornada
  };

  return (
    <View>
      {/* ... other UI components ... */}
      <Button title="Start New Jornada" onPress={handleStartNewJornada} />
    </View>
  );
}