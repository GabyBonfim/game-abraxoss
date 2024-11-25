import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function Cadastro3({ setScreen }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    pessoaum: '',
    numeroum: '',
    parentescoum: '',
    pessoadois: '',
    numerodois: '',
    parentescodois: '',
  });

  const handleInputChange = (field, value) => {
    // Aplica a remoção de caracteres não numéricos apenas nos campos de números
    const numericFields = ['numeroum', 'numerodois'];
    const updatedValue = numericFields.includes(field) ? value.replace(/[^0-9]/g, '') : value;
  
    setFormData({ ...formData, [field]: updatedValue });
  };

  const validateFields = async () => {
    const newErrors = {};
    if (!formData.pessoaum) newErrors.pessoaum = 'Preencha o nome da pessoa 1';
    if (!formData.numeroum) newErrors.numeroum = 'Preencha o número de contato';
    if (!formData.parentescoum) newErrors.parentescoum = 'Informe o parentesco';
    if (!formData.pessoadois) newErrors.pessoadois = 'Preencha o nome da pessoa 2';
    if (!formData.numerodois) newErrors.numerodois = 'Preencha o número de contato';
    if (!formData.parentescodois) newErrors.parentescodois = 'Informe o parentesco';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const user = auth.currentUser;
        const userRef = db.ref(`users/${user.uid}/contatos`);
        await userRef.set({
          pessoaUm: {
            nome: formData.pessoaum,
            numero: formData.numeroum,
            parentesco: formData.parentescoum,
          },
          pessoaDois: {
            nome: formData.pessoadois,
            numero: formData.numerodois,
            parentesco: formData.parentescodois,
          },
        });
  
        Alert.alert('Sucesso', 'Cadastro concluído!');
        setScreen('SnakeGame');
      } catch (error) {
        console.error('Erro ao salvar contatos:', error.message);
        Alert.alert('Erro', 'Não foi possível salvar os contatos.');
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.containerCadastroTres}>
      <Text style={styles.titleCadastro}> Estamos chegando ao fim!</Text>

      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Passo 3 - contato de emergência </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewCadastroTres}>
        {/* Formulário Pessoa 1 */}
        <View style={styles.formCadastroTres}>
          <View style={styles.inputRowCenteredCadastroTres}>
            <View style={styles.inputGroupWideCadastroTres}>
              <Text style={styles.labelCadastroTres}>Pessoa 1</Text>
              <TextInput
                style={styles.inputCadastroTres}
                value={formData.pessoaum}
                onChangeText={(text) => handleInputChange('pessoaum', text)}
                placeholder="Digite o nome e sobrenome"
                placeholderTextColor="#666"
              />
              {errors.pessoaum && <Text style={styles.errorTextCadastroTres}>{errors.pessoaum}</Text>}
            </View>
          </View>

          <View style={styles.inputRowCadastroTres}>
            <View style={styles.inputGroupCadastroTres}>
              <Text style={styles.labelCadastroTres}>Número</Text>
              <TextInput
                style={styles.inputCadastroTres}
                value={formData.numeroum}
                onChangeText={(text) => handleInputChange('numeroum', text)}
                placeholder="(XX) XXXXX-XXXX"
                keyboardType="numeric"
                maxLength={15}
                placeholderTextColor="#666"
              />
              {errors.numeroum && <Text style={styles.errorTextCadastroTres}>{errors.numeroum}</Text>}
            </View>

            <View style={styles.inputGroupCadastroTres}>
              <Text style={styles.labelCadastroTres}>Parentesco</Text>
              <TextInput
                style={styles.inputCadastroTres}
                value={formData.parentescoum}
                onChangeText={(text) => handleInputChange('parentescoum', text)}
                placeholder="Mãe, tia, amiga, etc."
                placeholderTextColor="#666"
              />
              {errors.parentescoum && <Text style={styles.errorTextCadastroTres}>{errors.parentescoum}</Text>}
            </View>
          </View>

          {/* Formulário Pessoa 2 */}
          <View style={styles.inputRowCenteredCadastroTres}>
            <View style={styles.inputGroupWideCadastroTres}>
              <Text style={styles.labelCadastroTres}>Pessoa 2</Text>
              <TextInput
                style={styles.inputCadastroTres}
                value={formData.pessoadois}
                onChangeText={(text) => handleInputChange('pessoadois', text)}
                placeholder="Digite o nome e sobrenome"
                placeholderTextColor="#666"
              />
              {errors.pessoadois && <Text style={styles.errorTextCadastroTres}>{errors.pessoadois}</Text>}
            </View>
          </View>

          <View style={styles.inputRowCadastroTres}>
            <View style={styles.inputGroupCadastroTres}>
              <Text style={styles.labelCadastroTres}>Número</Text>
              <TextInput
                style={styles.inputCadastroTres}
                value={formData.numerodois}
                onChangeText={(text) => handleInputChange('numerodois', text)}
                placeholder="(XX) XXXXX-XXXX"
                keyboardType="numeric"
                maxLength={15} // Limita o comprimento para a máscara (11 dígitos + formatação)
                placeholderTextColor="#666"
              />
              {errors.numerodois && <Text style={styles.errorTextCadastroTres}>{errors.numerodois}</Text>}
            </View>

            <View style={styles.inputGroupCadastroTres}>
              <Text style={styles.labelCadastroTres}>Parentesco</Text>
              <TextInput
                style={styles.inputCadastroTres}
                value={formData.parentescodois}
                onChangeText={(text) => handleInputChange('parentescodois', text)}
                placeholder="Mãe, tia, amiga, etc."
                placeholderTextColor="#666"
              />
              {errors.parentescodois && <Text style={styles.errorTextCadastroTres}>{errors.parentescodois}</Text>}
            </View>
          </View>
        </View>

        {/* Botão Avançar */}
        <TouchableOpacity 
          style={styles.buttonAvancarCadastroTres} 
          onPress={validateFields}>
          <Text style={styles.buttonTextCadastroTres}>Avançar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  titleCadastro: {
    color: '#4B0082',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 100,
  },
  subtitleTextCadastro: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  containerCadastroTres: {
    flex: 1,
    backgroundColor: '#e6e7ff',
  },
  scrollViewCadastroTres: {
    padding: 20,
  },
  buttonTextCadastroTres: {
    color: 'white',
    fontWeight: 'bold',
  },
  formCadastroTres: {
    marginBottom: 30,
  },
  inputRowCenteredCadastroTres: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputGroupWideCadastroTres: {
    width: '100%',
  },
  inputRowCadastroTres: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputGroupCadastroTres: {
    width: '48%',
  },
  labelCadastroTres: {
    fontSize: 14,
    color: '#4B0082',
    marginBottom: 5,
  },
  inputCadastroTres: {
    backgroundColor: '#4B0082',
    borderRadius: 5,
    padding: 10,
    color: 'white',
  },
  buttonAvancarCadastroTres: {
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
  errorTextCadastroTres: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  subtitle: {
    backgroundColor: '#9370DB',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    width: '80%', 
    alignSelf: 'center',
  },
  
  subtitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
