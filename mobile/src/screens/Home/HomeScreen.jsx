import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { mobileApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { formatCurrency, formatPoints } from '../../utils/formatters';
import { COLORS } from '../../utils/constants';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    puntos: 0,
    saldo: 0,
    ofertas: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [puntosRes, saldoRes, ofertasRes] = await Promise.all([
        mobileApi.getPuntos(),
        mobileApi.getSaldo(),
        mobileApi.getOfertas({ limit: 5 }),
      ]);

      setData({
        puntos: puntosRes.data.puntos || 0,
        saldo: saldoRes.data.saldo || 0,
        ofertas: ofertasRes.data || [],
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.welcome}>
          ¡Bienvenido a Clientazo!
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Puntos Acumulados
            </Text>
            <Text variant="headlineLarge" style={styles.statValue}>
              {formatPoints(data.puntos)}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Saldo Disponible
            </Text>
            <Text variant="headlineLarge" style={styles.statValue}>
              {formatCurrency(data.saldo)}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Ofertas Destacadas
          </Text>
          <Text variant="bodyMedium" style={styles.sectionSubtitle}>
            {data.ofertas.length} ofertas disponibles
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Ofertas')}
            style={styles.button}
          >
            Ver Todas las Ofertas
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.actionTitle}>
            Acciones Rápidas
          </Text>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Tarjeta')}
            style={styles.actionButton}
          >
            Ver Mi Tarjeta
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Compras')}
            style={styles.actionButton}
          >
            Historial de Compras
          </Button>
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
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
  },
  welcome: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  statLabel: {
    color: COLORS.gray,
    marginBottom: 8,
  },
  statValue: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.gray,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  actionTitle: {
    marginBottom: 12,
  },
  actionButton: {
    marginTop: 8,
  },
});
