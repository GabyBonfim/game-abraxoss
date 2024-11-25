import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../firebaseConfig';

export default function Cadastro1({ setScreen }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [fieldsDisabled, setFieldsDisabled] = useState(false); // Controle para desabilitar campos de email e senha
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    email: '',
    senha: '',
    confirmaSenha: '',
  });

  const handleChange = async (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Verifica email ao ser alterado
    if (field === 'email' && value.includes('@')) {
      try {
        const fetchSignInMethodsForEmail = await auth.fetchSignInMethodsForEmail(value);
        if (fetchSignInMethodsForEmail.length > 0) {
          setFieldsDisabled(true); // Desabilita os campos de email e senha
          Alert.alert('Email já cadastrado', 'Complete as informações restantes.');
        } else {
          setFieldsDisabled(false);
        }
      } catch (error) {
        console.error('Erro ao verificar email:', error.message);
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
  
    if (!formData.nome) newErrors.nome = 'O nome é obrigatório.';
    if (!formData.email) newErrors.email = 'O email é obrigatório.';
    if (!fieldsDisabled && !formData.senha) newErrors.senha = 'A senha é obrigatória.';
    if (!fieldsDisabled && formData.senha !== formData.confirmaSenha) {
      newErrors.confirmaSenha = 'As senhas não coincidem.';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        let user;
  
        if (fieldsDisabled) {
          user = auth.currentUser;
        } else {
          const userCredential = await auth.createUserWithEmailAndPassword(formData.email, formData.senha);
          user = userCredential.user;
        }
  
        // Salva os dados pessoais no caminho fixo
        const userRef = db.ref(`users/${user.uid}/dadosPessoais`);
        await userRef.set({
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          cpf: formData.cpf,
          rg: formData.rg,
          dataNascimento: formData.dataNascimento,
        });
  
        setScreen('Cadastro2');
      } catch (error) {
        console.error('Erro no processo de cadastro:', error.message);
        Alert.alert('Erro', error.message);
      }
    }
  };

  const handleShowDatePicker = () => setShowDatePicker(true);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, dataNascimento: selectedDate.toISOString().split('T')[0] });
    }
  };

  return (
    <SafeAreaView style={styles.containerCadastro}>
      <ScrollView contentContainerStyle={styles.scrollViewCadastro}>
      <Text style={styles.titleCadastro}>Realize o seu cadastro!</Text>

      <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Passo 1 - dados pessoais </Text>
      </View>

      {/* Campos do formulário */}
      <View style={styles.rowCadastro}>
        <View style={styles.inputGroupCadastro}>
          <Text style={styles.labelCadastro}>Nome</Text>
          <TextInput
            style={[styles.inputCadastro, errors.nome && styles.inputErrorCadastro]}
            value={formData.nome}
            onChangeText={(text) => handleChange("nome", text)}
            placeholder="Anna Clara"
            placeholderTextColor="#666"
          />
          {errors.nome && <Text style={styles.errorTextCadastro}>{errors.nome}</Text>}
        </View>

        <View style={styles.inputGroupCadastro}>
          <Text style={styles.labelCadastro}>Sobrenome</Text>
          <TextInput
            style={[styles.inputCadastro, errors.sobrenome && styles.inputErrorCadastro]}
            value={formData.sobrenome}
            onChangeText={(text) => handleChange("sobrenome", text)}
            placeholder="Machado Batista"
            placeholderTextColor="#666"
          />
          {errors.sobrenome && <Text style={styles.errorTextCadastro}>{errors.sobrenome}</Text>}
        </View>
      </View>

      {/* CPF e RG */}
      <View style={styles.rowCadastro}>
        <View style={styles.inputGroupCadastro}>
          <Text style={styles.labelCadastro}>CPF</Text>
          <TextInput
            style={[styles.inputCadastro, errors.cpf && styles.inputErrorCadastro]}
            value={formData.cpf}
            onChangeText={(text) => handleChange("cpf", text.slice(0, 11))}
            keyboardType="numeric"
            placeholder="21458992903"
            placeholderTextColor="#666"
          />
          {errors.cpf && <Text style={styles.errorTextCadastro}>{errors.cpf}</Text>}
        </View>

        <View style={styles.inputGroupCadastro}>
          <Text style={styles.labelCadastro}>RG</Text>
          <TextInput
            style={[styles.inputCadastro, errors.rg && styles.inputErrorCadastro]}
            value={formData.rg}
            onChangeText={(text) => handleChange("rg", text.slice(0, 9))}
            keyboardType="numeric"
            placeholder="53389388X"
            placeholderTextColor="#666"
          />
          {errors.rg && <Text style={styles.errorTextCadastro}>{errors.rg}</Text>}
        </View>
      </View>

      {/* Data de Nascimento e Email */}
      <View style={styles.rowCadastro}>
        <View style={styles.inputGroupCadastro}>
          <Text style={styles.labelCadastro}>Data de Nascimento</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.inputCadastro, errors.dataNascimento && styles.inputErrorCadastro]}>
            <Text style={styles.dateTextCadastro}>{formData.dataNascimento || "Selecione a data"}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {errors.dataNascimento && <Text style={styles.errorTextCadastro}>{errors.dataNascimento}</Text>}
        </View>

        <View style={styles.inputGroupCadastro}>
          <Text style={styles.labelCadastro}>Email</Text>
          <TextInput
            style={[styles.inputCadastro, errors.email && styles.inputErrorCadastro]}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            editable={!fieldsDisabled}
            keyboardType="email-address"
            placeholder="annabmsy@gmail.com"
            placeholderTextColor="#666"
          />
          {errors.email && <Text style={styles.errorTextCadastro}>{errors.email}</Text>}
        </View>
      </View>

      {/* Senha e Confirmar Senha */}
      <View style={styles.rowCadastro}>
        <View style={styles.inputGroupCadastro}>
          <Text style={styles.labelCadastro}>Senha</Text>
          <TextInput
            style={[styles.inputCadastro, errors.senha && styles.inputErrorCadastro]}
            value={formData.senha}
            onChangeText={(text) => handleChange("senha", text)}
            editable={!fieldsDisabled}
            placeholder="Senha segura"
            placeholderTextColor="#666"
            secureTextEntry
          />
          {errors.senha && <Text style={styles.errorTextCadastro}>{errors.senha}</Text>}
        </View>

        <View style={styles.inputGroupCadastro}>
          <Text style={styles.labelCadastro}>Confirme sua Senha</Text>
          <TextInput
            style={[styles.inputCadastro, errors.confirmaSenha && styles.inputErrorCadastro]}
            value={formData.confirmaSenha}
            onChangeText={(text) => handleChange("confirmaSenha", text)}
            placeholder="Repita a senha"
            placeholderTextColor="#666"
            secureTextEntry
          />
          {errors.confirmaSenha && <Text style={styles.errorTextCadastro}>{errors.confirmaSenha}</Text>}
        </View>
      </View>

      {/* Botão de Envio */}
      <TouchableOpacity style={styles.buttonCadastro} onPress={handleSubmit}>
        <Text style={styles.buttonTextCadastro}>Avançar</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerCadastro: {
    flex: 1,
    backgroundColor: '#e6e7ff',
    padding: 30,
  },
  formContainerCadastro: {
    flex: 1,
    marginTop: 30,
  },
  rowCadastro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputGroupCadastro: {
    width: '48%',
  },
  labelCadastro: {
    color: '#4B0082',
    marginBottom: 8,
  },
  inputCadastro: {
    backgroundColor: '#4B0082',
    borderRadius: 5,
    padding: 15,
    color: 'white',
    marginBottom: 5,
  },
  inputErrorCadastro: {
    borderColor: 'red',
    borderWidth: 1,
  },
  dateTextCadastro: {
    color: 'white',
  },
  buttonCadastro: {
    backgroundColor: '#9370DB',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
    shadowColor: '#330066',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextCadastro: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorTextCadastro: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  titleCadastro: {
    color: '#4B0082',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 90,
  },

  subtitle: {
    backgroundColor: '#9370DB',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 30,
    
  },
  subtitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
