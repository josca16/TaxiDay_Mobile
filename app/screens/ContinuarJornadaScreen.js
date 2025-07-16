import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContinuarJornadaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla Continuar Jornada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  text: {
    color: '#FFF',
    fontSize: 18,
  },
});
