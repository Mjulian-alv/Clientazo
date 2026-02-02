import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { mobileApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS } from '../../utils/constants';

export default function TarjetaScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tarjeta, setTarjeta] = useState(null);

  useEffect(() => {
    loadTarjeta();
  }, []);

  const loadTarjeta = async () => {
    try {
      const response = await mobileApi.getTarjeta();
      setTarjeta(response.data);
    } catch (error) {
      console.error('Error al cargar tarjeta:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Mi Tarjeta Clientazo
          </Text>
          
          <View style={styles.cardContent}>
            <Text variant="bodyLarge" style={styles.label}>
              Cliente #
            </Text>
            <Text variant="displaySmall" style={styles.clienteId}>
              {tarjeta?.cliente_id}
            </Text>
          </View>

          <View style={styles.barcodeContainer}>
            <Text variant="bodyMedium" style={styles.barcodeLabel}>
              Código de Barras
            </Text>
            <View style={styles.barcodePlaceholder}>
              <Text variant="headlineMedium">
                {tarjeta?.codigo_barras}
              </Text>
            </View>
            <Text variant="bodySmall" style={styles.hint}>
              Presenta este código en caja
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.infoTitle}>
            Información
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            Muestra este código al momento de pagar para acumular puntos y acceder a tus ofertas exclusivas.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    margin: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  label: {
    color: COLORS.gray,
    marginBottom: 8,
  },
  clienteId: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  barcodeContainer: {
    alignItems: 'center',
  },
  barcodeLabel: {
    color: COLORS.gray,
    marginBottom: 16,
  },
  barcodePlaceholder: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 24,
    minWidth: '80%',
    alignItems: 'center',
  },
  hint: {
    color: COLORS.gray,
    marginTop: 16,
    textAlign: 'center',
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
  },
  infoTitle: {
    marginBottom: 8,
  },
  infoText: {
    lineHeight: 22,
  },
});
