import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { createEntities } from './gameLogic';
import Physics from './Physics';

export default function App() {
  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]} // Add the Physics system
        entities={createEntities()}
        style={styles.gameContainer}
      >
        <StatusBar style="auto" />
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    flex: 1,
  },
});