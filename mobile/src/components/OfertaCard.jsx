import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { formatCurrency } from '../utils/formatters';
import { COLORS } from '../utils/constants';

export default function OfertaCard({ oferta, onPress }) {
  const descuento = oferta.precio_regular > 0 
    ? Math.round((1 - oferta.precio_oferta / oferta.precio_regular) * 100)
    : 0;

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        {oferta.imagen_url && (
          <Card.Cover 
            source={{ uri: oferta.imagen_url }} 
            style={styles.image}
          />
        )}
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <Text variant="titleMedium" numberOfLines={2} style={styles.title}>
              {oferta.detalle}
            </Text>
            {oferta.etiqueta === 'CLIENTAZO' && (
              <Chip mode="flat" style={styles.chip}>CLIENTAZO</Chip>
            )}
          </View>
          
          {oferta.marca && (
            <Text variant="bodySmall" style={styles.marca}>{oferta.marca}</Text>
          )}
          
          <View style={styles.priceContainer}>
            {oferta.precio_regular > 0 && (
              <Text style={styles.precioRegular}>
                {formatCurrency(oferta.precio_regular)}
              </Text>
            )}
            <Text variant="headlineSmall" style={styles.precioOferta}>
              {formatCurrency(oferta.precio_oferta)}
            </Text>
            {descuento > 0 && (
              <Chip textStyle={styles.descuentoText} style={styles.descuento}>
                -{descuento}%
              </Chip>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 2,
  },
  image: {
    height: 180,
  },
  content: {
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  chip: {
    backgroundColor: COLORS.primary,
  },
  marca: {
    color: COLORS.gray,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  precioRegular: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginRight: 8,
  },
  precioOferta: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginRight: 8,
  },
  descuento: {
    backgroundColor: COLORS.success,
  },
  descuentoText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
