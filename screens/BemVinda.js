import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BemVinda({ setScreen }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda ao Abraxos Game!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setScreen('Cadastro1')}
      >
        <Text style={styles.buttonText}>Nunca acessei a plataforma, preciso me cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => setScreen('Login')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Já possuo cadastro, quero fazer login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4B0082',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4B0082',
  },
  secondaryButtonText: {
    color: '#4B0082',
  },
});
