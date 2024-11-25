import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function Login({ setScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const checkSession = async () => {
    const user = auth.currentUser;
    if (user) {
      try {

        const token = await user.getIdToken(true);
        console.log('Sessão ativa. Token válido:', token);
      } catch (error) {
        console.error('Erro ao renovar token:', error);
        auth.signOut(); 
        Alert.alert('Sessão inválida', 'Por favor, faça login novamente.');
      }
    } else {
      console.log('Nenhum usuário autenticado.');
    }
  };


  useEffect(() => {
    checkSession();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      console.log('Tentando autenticar no Firebase...');
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Usuário autenticado com sucesso:', user.email);

      // Buscar dados no Realtime Database
      console.log('Buscando dados do usuário no Realtime Database...');
      const userRef = db.ref(`users/${user.uid}`);
      const snapshot = await userRef.once('value');

      if (snapshot.exists()) {
        console.log('Usuário encontrado no banco de dados.');
        Alert.alert('Bem-vindo de volta!', 'Você já está cadastrado. Divirta-se!');
        setScreen('SnakeGame'); // Redireciona para o jogo
      } else {
        // Usuário autenticado, mas não encontrado no banco de dados
        console.error('Usuário não encontrado no banco de dados.');
        Alert.alert(
          'Bem-vindo!',
          'Não encontramos informações para sua conta. Vamos iniciar seu cadastro.',
          [{ text: 'Iniciar Cadastro', onPress: () => setScreen('Cadastro1') }]
        );
      }
    } catch (error) {
      console.error('Erro ao autenticar com email/senha:', error.code, error.message);

      // Tratamento de erros específicos
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert(
            'Usuário não encontrado',
            'O e-mail informado não está cadastrado. Deseja criar uma conta?',
            [{ text: 'Cadastrar-se', onPress: () => setScreen('Cadastro1') }]
          );
          break;
        case 'auth/wrong-password':
          Alert.alert(
            'Senha incorreta',
            'A senha digitada está incorreta. Por favor, tente novamente.'
          );
          break;
        case 'auth/invalid-email':
          Alert.alert(
            'Email inválido',
            'O endereço de email inserido não é válido. Verifique e tente novamente.'
          );
          break;
        case 'auth/invalid-credential':
          console.log('Token inválido detectado. Encerrando sessão.');
          auth.signOut();
          Alert.alert(
            'Erro de autenticação',
            'Houve um problema com suas credenciais. Por favor, faça login novamente.'
          );
          break;
        default:
          Alert.alert(
            'Erro inesperado',
            'Algo deu errado. Por favor, tente novamente mais tarde.'
          );
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um email válido para redefinir sua senha.');
      return;
    }
  
    try {
      await auth.sendPasswordResetEmail(email); // Envia o email de redefinição
      Alert.alert(
        'Email Enviado',
        'Verifique sua caixa de entrada para redefinir sua senha.'
      );
    } catch (error) {
      console.error('Erro ao redefinir senha:', error.code, error.message);
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Erro', 'O email informado é inválido.');
          break;
        case 'auth/user-not-found':
          Alert.alert('Erro', 'Não há conta registrada com esse email.');
          break;
        default:
          Alert.alert('Erro', 'Algo deu errado. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <View style={styles.containerLogin}>
      <View style={styles.logoContainerLogin}>
        <Image source={require('../assets/logoaelin.png')} style={styles.logoLogin} />
      </View>

      <Text style={styles.titleLogin}>Entre já na sua conta!</Text>

      <View style={styles.inputContainerLogin}>
        <Text style={styles.labelLogin}>Email</Text>
        <TextInput
          style={styles.inputLogin}
          value={email}
          onChangeText={setEmail}
          placeholder="email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainerLogin}>
        <Text style={styles.labelLogin}>Senha</Text>
        <View style={styles.passwordContainerLogin}>
          <TextInput
            style={[styles.inputLogin, styles.passwordInputLogin]}
            value={password}
            onChangeText={setPassword}
            placeholder="senha"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconLogin}>
            <Text>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonTextLogin}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordLogin}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainerLogin}>
        <Text style={styles.signupTextLogin}>Novo por aqui? </Text>
        <TouchableOpacity onPress={() => setScreen('Cadastro1')}>
          <Text style={styles.signupLinkLogin}>Cadastre-se já!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: '#e6e7ff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainerLogin: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logoLogin: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  titleLogin: {
    fontSize: 24,
    fontWeight: '600',
    color: '#330066',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainerLogin: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  labelLogin: {
    marginTop: 10,
    fontSize: 16,
    color: '#330066',
    marginLeft: 160,
    textAlign: 'left',
    width: '100%',
  },
  inputLogin: {
    width: '60%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#330066',
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'left',
    marginBottom: 20,
  },
  passwordContainerLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '72%',
    marginLeft: 45,
  },
  passwordInputLogin: {
    flex: 1,
    textAlign: 'left',
    width: '70%',
  },
  eyeIconLogin: {
    padding: 10,
    marginRight: 30,
  },
  forgotPasswordLogin: {
    color: '#330066',
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonLogin: {
    width: '70%',
    height: 50,
    backgroundColor: '#330066',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#330066',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextLogin: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orTextLogin: {
    color: '#330066',
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  googleButtonLogin: {
    width: '70%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#330066',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIconLogin: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonTextLogin: {
    color: '#330066',
    fontSize: 16,
  },
  signupContainerLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextLogin: {
    color: '#330066',
    fontSize: 14,
  },
  signupLinkLogin: {
    color: '#330066',
    fontSize: 14,
    fontWeight: '600',
  },
});
