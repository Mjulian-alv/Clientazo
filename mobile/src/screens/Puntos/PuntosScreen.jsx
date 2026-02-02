import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { mobileApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { formatPoints } from '../../utils/formatters';
import { COLORS } from '../../utils/constants';

export default function PuntosScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    puntos: 0,
    puntosAnteriores: 0,
    ultimaActualizacion: null,
  });

  useEffect(() => {
    loadPuntos();
  }, []);

  const loadPuntos = async () => {
    try {
      const response = await mobileApi.getPuntos();
      setData(response.data);
    } catch (error) {
      console.error('Error al cargar puntos:', error);
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
          <Text variant="titleMedium" style={styles.label}>
            Puntos Acumulados
          </Text>
          <Text variant="displayMedium" style={styles.points}>
            {formatPoints(data.puntos)}
          </Text>
          {data.ultimaActualizacion && (
            <Text variant="bodySmall" style={styles.date}>
              Última actualización: {new Date(data.ultimaActualizacion).toLocaleDateString()}
            </Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.infoTitle}>
            ¿Cómo funcionan los puntos?
          </Text>
          <Divider style={styles.divider} />
          <Text variant="bodyMedium" style={styles.infoText}>
            • Acumulas puntos con cada compra{'\n'}
            • Los puntos se actualizan automáticamente{'\n'}
            • Consulta tu saldo en cualquier momento{'\n'}
            • ¡Disfruta de beneficios exclusivos!
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
    alignItems: 'center',
  },
  label: {
    color: COLORS.gray,
    marginBottom: 8,
    textAlign: 'center',
  },
  points: {
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    color: COLORS.gray,
    marginTop: 8,
    textAlign: 'center',
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
  },
  infoTitle: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  infoText: {
    lineHeight: 24,
  },
});
