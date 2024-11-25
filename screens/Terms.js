import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Terms({ setScreen }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.contentTerms}>
      <View style={styles.innerContentTerms}>
        <Text style={styles.titleTerms}>Termos de uso</Text>
        <Text style={styles.subtitleTerms}>
          Termos de Uso - Coleta de{'\n'}Imagem, Áudio e Localização
        </Text>

        <Text style={styles.paragraph}>
          Este documento descreve os termos e condições sob os quais o uso de imagens,
          áudio e dados de localização são coletados e compartilhados por meio deste
          aplicativo. Ao utilizar este aplicativo, você concorda com os termos abaixo.
        </Text>

        <Text style={styles.sectionTitle}>1. Coleta de Dados</Text>
        <Text style={styles.paragraph}>
          A coleta de imagem, áudio e localização só será ativada e iniciada quando o
          dispositivo for sacudido intencionalmente pelo usuário. O aplicativo não realiza
          nenhuma coleta automática de dados sem essa ação específica.
        </Text>

        <Text style={styles.sectionTitle}>2. Uso dos Dados Coletados</Text>
        <Text style={styles.paragraph}>
          Os dados coletados (imagem, áudio e localização) serão utilizados exclusivamente
          para fins de registro e proteção, e apenas nos seguintes cenários:
        </Text>
        <Text style={styles.bulletPoint}>
          • Compartilhamento: Os dados serão compartilhados apenas com delegacias de
          polícia ou suspeitos de denúncia autorizados, dependendo da viabilidade legal e
          técnica no momento do acionamento. O propósito deste compartilhamento é
          garantir a segurança do usuário em situações de emergência ou ameaça.
        </Text>

        <Text style={styles.sectionTitle}>3. Consentimento</Text>
        <Text style={styles.paragraph}>
          Ao ativar a funcionalidade de sacudir o dispositivo, o usuário concorda
          explicitamente com a coleta temporária dos dados mencionados e com seu
          compartilhamento, conforme descrito.
        </Text>

        <Text style={styles.sectionTitle}>4. Armazenamento de Dados</Text>
        <Text style={styles.paragraph}>
          Os dados coletados não serão armazenados permanentemente pelo aplicativo.
          Após o envio para as autoridades competentes, eles serão automaticamente
          excluídos do sistema, mantendo a proteção da privacidade do usuário.
        </Text>

        <Text style={styles.sectionTitle}>5. Transparência</Text>
        <Text style={styles.paragraph}>
          Este aplicativo não acessa nem utiliza imagens, áudio ou localização sem o
          consentimento explícito do usuário via ativação manual (sacudir o dispositivo).
        </Text>

        <Text style={styles.sectionTitle}>6. Alterações nos Termos</Text>
        <Text style={styles.paragraph}>
          Qualquer alteração nestes termos será comunicada com antecedência e, ao
          continuar a utilizar o aplicativo, o usuário estará concordando com as
          modificações.
        </Text>

        <Text style={styles.sectionTitle}>7. Contato</Text>
        <Text style={styles.paragraph}>
          Caso tenha dúvidas ou preocupações sobre a coleta de dados, entre em contato
          com nosso suporte pelo e-mail: [email de suporte].
        </Text>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={styles.checkbox} onPress={() => setIsChecked(!isChecked)}>
            <Text style={styles.checkboxText}>{isChecked ? "☑" : "☐"} Aceito os termos de uso</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => isChecked && setScreen('Home')}>
            <Text style={styles.buttonText}>Concluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentTerms: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FAE6E6',
  },
  innerContentTerms: {
    paddingBottom: 20,
  },
  titleTerms: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#de482c',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleTerms: {
    fontSize: 18,
    color: '#de482c',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
    marginLeft: 8,
    marginBottom: 12,
  },
  checkboxContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  checkbox: {
    marginVertical: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#de482c',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
