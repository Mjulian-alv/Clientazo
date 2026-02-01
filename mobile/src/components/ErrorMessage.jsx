import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS } from '../utils/constants';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.error,
    padding: 12,
    borderRadius: 8,
    margin: 16,
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
  },
});
