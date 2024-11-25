import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

export default function Welcome({ setScreen }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerCard}>
          <Text style={styles.title}>Seja bem-vinda ao{'\n'}Abraxos Game!</Text>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>o game do seu dragão!</Text>
          </View>
        </View>
        <Text style={styles.infoText}>
          Para acessar esse app, é necessário que você fique atenta sobre as seguintes informações:
        </Text>
        <View style={styles.warningCard}>
          <Text style={styles.warningText}>
            Este aplicativo é um BOTÃO DO PÂNICO para MULHERES EM SITUAÇÃO DE VIOLÊNCIA DOMÉSTICA.
          </Text>
        </View>
        <Text style={styles.helpText}>
          Caso precise de ajuda, basta apertar o botão da tela anterior do dragão e ele ativará a câmera, localização e áudio, tais dados que serão enviados para a delegacia e acionará as autoridades.
        </Text>
        <Text style={styles.descriptionText}>
          O Abraxos Game é um jogo da memória, onde você pode cuidar dele e não ficar evidente a real função deste app. Por favor, leia mais informações em SUPORTE no menu acima.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('BemVinda')}>
          <Text style={styles.buttonText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e7ff',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCard: {
    backgroundColor: '#6a5acd',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    backgroundColor: '#FAE6E6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  subtitleText: {
    color: '#6a5acd',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  warningCard: {
    backgroundColor: 'black',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  warningText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  helpText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6a5acd',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
