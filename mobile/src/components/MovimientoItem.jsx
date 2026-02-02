import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function MovimientoItem({ movimiento }) {
  return (
    <>
      <List.Item
        title={`Movimiento #${movimiento.ID}`}
        description={`${movimiento.TIPOMOVIMIENTO || 'Compra'} - ${formatDate(movimiento.FECHAREGISTRO)}`}
        right={() => (
          <View style={styles.rightContainer}>
            <List.Item
              title={formatCurrency(movimiento.MONTOTOTAL)}
              titleStyle={styles.amount}
            />
          </View>
        )}
        style={styles.item}
      />
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
  },
  rightContainer: {
    justifyContent: 'center',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
