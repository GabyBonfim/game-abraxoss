import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function Home({ setScreen }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showGameButton, setShowGameButton] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuário autenticado:', user.email);
        setIsLoggedIn(true);
      } else {
        console.log('Usuário não autenticado');
        setIsLoggedIn(false);
      }
    });

    const timer = setTimeout(() => {
      setShowGameButton(true);
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handlePanicButtonPress = async () => {
    const user = auth.currentUser;

    if (isLoggedIn && user) {
      const panicData = {
        ativado: true,
        data: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        email: user.email,
        uid: user.uid,
      };

      try {
        // Salva os dados no Firebase
        console.log('Salvando dados no Firebase...');
        await db.ref(`users/${user.uid}/botaoPanico`).set(panicData);

        Alert.alert(
          'Botão do Pânico Ativado!',
          'A equipe já foi notificada, matenha-se a salvo.',
          [{ text: 'OK' }]
        );
      } catch (error) {
        console.error('Erro ao registrar o botão do pânico:', error);
        Alert.alert(
          'Erro',
          'Não foi possível registrar os dados no momento. Tente novamente mais tarde.'
        );
      }
    } else {
      Alert.alert(
        'Acesso Negado',
        'Você precisa estar logado para usar o botão do pânico.',
        [{ text: 'Fazer Login', onPress: () => setScreen('BemVinda') }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePanicButtonPress}>
        <Image source={require('../assets/logogame.png')} style={styles.logo} />
      </TouchableOpacity>

      {showGameButton && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (isLoggedIn) {
              setScreen('SnakeGame');
            } else {
              Alert.alert(
                'Acesso Negado',
                'Você precisa estar logado para acessar o jogo.',
                [{ text: 'Fazer Login', onPress: () => setScreen('Login') }]
              );
            }
          }}
        >
          <Text style={styles.buttonText}>Seguir para o jogo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6a5acd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    width: 200,
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 9,
  },
});
