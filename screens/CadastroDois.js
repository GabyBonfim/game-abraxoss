import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { auth, db } from '../firebaseConfig';

export default function Cadastro2({ setScreen }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    pontorefere: '',
  });

  const estadosBrasil = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateFields = async () => {
    const newErrors = {};
    if (!formData.endereco) newErrors.endereco = 'Preencha o endereço';
    if (!formData.numero) newErrors.numero = 'Preencha o número';
    if (!formData.bairro) newErrors.bairro = 'Preencha o bairro';
    if (!formData.cidade) newErrors.cidade = 'Preencha a cidade';
    if (!formData.estado) newErrors.estado = 'Selecione o estado';
    if (!formData.cep) newErrors.cep = 'Digite o CEP.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const user = auth.currentUser;
        const userRef = db.ref(`users/${user.uid}/endereco`);
        await userRef.set({
          endereco: formData.endereco,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
        });

        setScreen('Cadastro3');
      } catch (error) {
        console.error('Erro ao salvar endereço:', error.message);
        Alert.alert('Erro', 'Não foi possível salvar o endereço.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.containerCadastroDois}>
      <ScrollView contentContainerStyle={styles.scrollViewCadastroDois}>
        <Text style={styles.titleCadastro}>Continue realizando seu cadastro!</Text>

        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>Passo 2 - endereço</Text>
        </View>

        <View style={styles.formContainerCadastroDois}>
          <View style={styles.rowCadastroDois}>
            <View style={styles.inputGroupCadastroDois}>
              <Text style={styles.labelCadastroDois}>Endereço</Text>
              <TextInput
                style={[styles.inputCadastroDois, errors.endereco && styles.inputErrorCadastroDois]}
                value={formData.endereco}
                onChangeText={(text) => handleChange('endereco', text)}
                placeholder="Rua Exemplo"
                placeholderTextColor="#666"
              />
              {errors.endereco && <Text style={styles.errorTextCadastroDois}>{errors.endereco}</Text>}
            </View>

            <View style={styles.inputGroupCadastroDois}>
              <Text style={styles.labelCadastroDois}>Número</Text>
              <TextInput
                style={[styles.inputCadastroDois, errors.numero && styles.inputErrorCadastroDois]}
                value={formData.numero}
                onChangeText={(text) => handleChange('numero', text)}
                keyboardType="numeric"
                placeholder="123"
                placeholderTextColor="#666"
              />
              {errors.numero && <Text style={styles.errorTextCadastroDois}>{errors.numero}</Text>}
            </View>
          </View>

          <View style={styles.rowCadastroDois}>
            <View style={styles.inputGroupCadastroDois}>
              <Text style={styles.labelCadastroDois}>Bairro</Text>
              <TextInput
                style={[styles.inputCadastroDois, errors.bairro && styles.inputErrorCadastroDois]}
                value={formData.bairro}
                onChangeText={(text) => handleChange('bairro', text)}
                placeholder="Bairro Exemplo"
                placeholderTextColor="#666"
              />
              {errors.bairro && <Text style={styles.errorTextCadastroDois}>{errors.bairro}</Text>}
            </View>

            <View style={styles.inputGroupCadastroDois}>
              <Text style={styles.labelCadastroDois}>Cidade</Text>
              <TextInput
                style={[styles.inputCadastroDois, errors.cidade && styles.inputErrorCadastroDois]}
                value={formData.cidade}
                onChangeText={(text) => handleChange('cidade', text)}
                placeholder="Cidade"
                placeholderTextColor="#666"
              />
              {errors.cidade && <Text style={styles.errorTextCadastroDois}>{errors.cidade}</Text>}
            </View>
          </View>

          <View style={styles.rowCadastroDois}>
            <View style={styles.inputGroupCadastroDois}>
              <Text style={styles.labelCadastroDois}>Estado</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.estado}
                  onValueChange={(value) => handleChange('estado', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione o estado" value="" />
                  {estadosBrasil.map((estado) => (
                    <Picker.Item key={estado} label={estado} value={estado} />
                  ))}
                </Picker>
              </View>
              {errors.estado && <Text style={styles.errorTextCadastroDois}>{errors.estado}</Text>}
            </View>

          </View>

          <View style={styles.rowCadastroDois}>
          <View style={styles.inputGroupCadastroDois}>
            <Text style={styles.labelCadastroDois}>CEP</Text>
            <TextInput
              style={[styles.inputCadastroDois, errors.cep && styles.inputErrorCadastroDois]}
              value={formData.cep}
              onChangeText={(text) => handleChange("cep", text.slice(0, 8))}
              keyboardType="numeric"
              placeholder="12345678"
              placeholderTextColor="#666"
            />
            {errors.cep && <Text style={styles.errorTextCadastroDois}>{errors.cep}</Text>}
          </View>

          <View style={styles.inputGroupCadastroDois}>
            <Text style={styles.labelCadastroDois}>Ponto de Referência</Text>
            <TextInput
              style={styles.inputCadastroDois}
              value={formData.pontorefere}
              onChangeText={(text) => handleChange("pontorefere", text)}
              placeholder="Próximo ao parque"
              placeholderTextColor="#666"
            />
          </View>
        </View>

          <TouchableOpacity style={styles.buttonCadastroDois} onPress={validateFields}>
            <Text style={styles.buttonTextCadastro}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pickerContainer: { backgroundColor: '#fff', borderRadius: 5, marginBottom: 10 },
  picker: { height: 50 },
  scrollViewCadastroDois: { padding: 20 },
  titleCadastro: {
    color: '#4B0082',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 100,
  },
  subtitleTextCadastro: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  containerCadastroDois: {
    flex: 1,
    backgroundColor: '#e6e7ff',
    padding: 20,
  },
  formContainerCadastroDois: {
    flex: 1,
    marginTop: 30,
  },
  rowCadastroDois: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputGroupCadastroDois: {
    width: '48%',
  },
  labelCadastroDois: {
    color: '#4B0082',
    marginBottom: 8,
  },
  inputCadastroDois: {
    backgroundColor: '#4B0082',
    borderRadius: 5,
    padding: 15,
    color: 'white',
    marginBottom: 5,
  },
  inputErrorCadastroDois: {
    borderColor: 'red',
    borderWidth: 1,
  },
  buttonCadastroDois: {
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
  errorTextCadastroDois: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
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
