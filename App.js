import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, Image, Linking} from 'react-native';

import Home from './screens/Home';
import Welcome from './screens/Welcome';
import BemVinda from './screens/BemVinda';
import Login from './screens/Login';
import Terms from './screens/Terms';
import Cadastro1 from './screens/Cadastro';
import Cadastro2 from './screens/CadastroDois';
import Cadastro3 from './screens/CadastroTres';
import SnakeGame from './screens/SnakeGame';

export default function App() {
  const [screen, setScreen] = useState('Home');

  const renderScreen = () => {
    switch (screen) {
      case 'Home':
        return <Home setScreen={setScreen} />;
      case 'Welcome':
        return <Welcome setScreen={setScreen} />;
      case 'BemVinda':
        return <BemVinda setScreen={setScreen} />;
      case 'Login':
        return <Login setScreen={setScreen} />;
      case 'Terms':
        return <Terms setScreen={setScreen} />;
      case 'Cadastro1':
        return <Cadastro1 setScreen={setScreen} />;
      case 'Cadastro2':
        return <Cadastro2 setScreen={setScreen} />;
      case 'Cadastro3':
        return <Cadastro3 setScreen={setScreen} />;
      case 'SnakeGame':
        return <SnakeGame setScreen={setScreen} />;
      case 'Suporte':
        return (
          <View style={stylesSuporte.container}>
            <Text style={stylesSuporte.title}>Suporte</Text>
            <Text style={stylesSuporte.subtitle}>
              Olá! Essa é a página de suporte ao usuário do Abraxos Game.
            </Text>
            <Text style={stylesSuporte.question}>No que podemos te ajudar hoje?</Text>
            <TouchableOpacity style={stylesSuporte.button} onPress={() => Linking.openURL('https://forms.gle/cWC3c6iZu5Hwaoe66')}>
              <Text style={stylesSuporte.buttonText}>
                Aperte aqui para acessar o formulário
              </Text>
            </TouchableOpacity>
            <Text style={stylesSuporte.obs}>
              Obs: este formulário foi planejado para em casos de dúvidas, feedback ou suporte em
              áreas específicas do app.
            </Text>
            <View style={stylesSuporte.divider} />
            <Text style={stylesSuporte.faqTitle}>Perguntas comuns</Text>
            <Text style={stylesSuporte.questionTitle}>
              “Estou tendo dificuldades no login.”
            </Text>
            <Text style={stylesSuporte.answer}>
              Em casos de problemas com login, acesse o nosso formulário e descreva seu problema
              para que possamos te ajudar.
            </Text>
            <Text style={stylesSuporte.questionTitle}>
              “Como funciona o botão do pânico?”
            </Text>
            <Text style={stylesSuporte.answer}>
              Este aplicativo foi desenvolvido especificamente para mulheres em situação de
              violência doméstica, bem como possui ligação com o Aelin Web, por isso fica
              disponível para download dentro do site.
            </Text>
            <Text style={stylesSuporte.answer}>
              Em casos de violência doméstica, basta pressionar o botão da tela inicial, como o da
              imagem abaixo.
            </Text>
            <View style={stylesSuporte.imagePlaceholder}>
              <Image
                source={require('./assets/logogame.png')} 
                style={stylesSuporte.image} 
              />
            </View>
            <Text style={stylesSuporte.warning}>
              Aviso: o fundo branco é apenas representativo, o botão com a descrição "ABRAXOS"
              sobreposto pelo dragão é o botão personalizado.
            </Text>
            <TouchableOpacity
              style={stylesSuporte.backButton}
              onPress={() => setScreen('Home')}
            >
              <Text style={stylesSuporte.backButtonText}>voltar para o jogo</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <Home setScreen={setScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu de Navegação Superior */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('Home')}>
          <Text style={styles.menuText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('Suporte')}>
          <Text style={styles.menuText}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => setScreen('Login')}>
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.screenContainer}>{renderScreen()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    zIndex: 10,
    elevation: 0, // Remove sombra no Android
  },
  menuButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  menuText: {
    color: '#330066',
    fontWeight: 'bold',
    fontSize: 14,
  },
  screenContainer: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 50 : 50,
  },
});

const stylesSuporte = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2e9fc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#330066',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#330066',
    textAlign: 'center',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    color: '#330066',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#330066',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  obs: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#330066',
    marginBottom: 10,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#330066',
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  imagePlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imageText: {
    color: '#330066',
    fontSize: 12,
  },
  warning: {
    fontSize: 12,
    color: '#ff0000',
    textAlign: 'center',
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#330066',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#330066',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 300,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
