import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';

const CARD_PAIRS = [
  require('../assets/images/cabecaabraxos.png'),
  require('../assets/images/abraxosazul.png'),
  require('../assets/images/abraxosamarelo.png'),
  require('../assets/images/abraxospreto.png'),
  require('../assets/images/abraxosrosa.png'),
  require('../assets/images/abraxosroxo.png'),
  require('../assets/images/abraxosverde.png'),
  require('../assets/images/abraxosverdeneon.png'),
  require('../assets/images/coxadefrango.png'),
  require('../assets/images/sol.png'),
];

const shuffleArray = (array) => {
  return array
    .concat(array) // Duplica os itens para formar pares
    .sort(() => Math.random() - 0.5);
};

export default function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disableTouch, setDisableTouch] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setCards(shuffleArray(CARD_PAIRS));
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setFeedbackMessage('');
  };

  const handleCardPress = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index) || flippedCards.includes(index)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setDisableTouch(true);
      const firstCard = cards[newFlippedCards[0]];
      const secondCard = cards[newFlippedCards[1]];

      if (firstCard === secondCard) {
        setMatchedCards((prev) => [...prev, ...newFlippedCards]);
        setScore((prev) => prev + 10);
        setFeedbackMessage('❤️ Perfeito! Você está arrasando!');
        setTimeout(() => {
          setFlippedCards([]);
          setFeedbackMessage('');
          setDisableTouch(false);
        }, 1000);
      } else {
        setFeedbackMessage('Tudo bem, tente de novo até ficar fera!');
        setTimeout(() => {
          setFlippedCards([]);
          setFeedbackMessage('');
          setDisableTouch(false);
        }, 1000);
      }
    }

    if (matchedCards.length + 2 === cards.length) {
      Alert.alert('Parabéns!', 'Você completou o jogo!', [{ text: 'Jogar Novamente', onPress: resetGame }]);
    }
  };

  const renderCard = ({ item, index }) => {
    const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);

    return (
      <TouchableOpacity
        style={[styles.card, isFlipped && styles.flippedCard]}
        onPress={() => handleCardPress(index)}
        disabled={disableTouch}
      >
        {isFlipped ? (
          <Image source={item} style={styles.cardImage} />
        ) : (
          <Text style={styles.cardText}>?</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abraxos Game - memória</Text>
      <Text style={styles.score}>Pontuação: {score}</Text>
      {feedbackMessage && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>{feedbackMessage}</Text>
        </View>
      )}
      <FlatList
        data={cards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCard}
        numColumns={4}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#330066',
    marginBottom: 10,
    marginTop: 40,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#330066',
    marginBottom: 20,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#6a5acd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    height: 70,
    width: 70,
  },
  flippedCard: {
    backgroundColor: '#ffff',
  },
  cardText: {
    fontSize: 24,
    color: '#fff',
  },
  cardImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  feedbackContainer: {
    position: 'absolute',
    top: '80%', // Centraliza na tela
    backgroundColor: '#330066',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: '90%',
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
