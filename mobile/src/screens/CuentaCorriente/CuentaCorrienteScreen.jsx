import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { mobileApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { formatCurrency } from '../../utils/formatters';
import { COLORS } from '../../utils/constants';

export default function CuentaCorrienteScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    saldo: 0,
    ultimaActualizacion: null,
  });

  useEffect(() => {
    loadSaldo();
  }, []);

  const loadSaldo = async () => {
    try {
      const response = await mobileApi.getSaldo();
      setData(response.data);
    } catch (error) {
      console.error('Error al cargar saldo:', error);
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
            Saldo Disponible
          </Text>
          <Text variant="displayMedium" style={styles.saldo}>
            {formatCurrency(data.saldo)}
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
            Información de Cuenta Corriente
          </Text>
          <Text variant="bodyMedium" style={styles.infoText}>
            • Consulta tu saldo disponible en cualquier momento{'\n'}
            • El saldo se actualiza automáticamente con cada transacción{'\n'}
            • Usa tu cuenta corriente para compras en el supermercado
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
  saldo: {
    color: data => data.saldo >= 0 ? COLORS.success : COLORS.error,
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
    marginBottom: 12,
  },
  infoText: {
    lineHeight: 24,
  },
});
