import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, Button, Divider } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { mobileApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS } from '../../utils/constants';

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    loadPerfil();
  }, []);

  const loadPerfil = async () => {
    try {
      const response = await mobileApi.getPerfil();
      setPerfil(response.data);
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Mi Perfil
          </Text>
          
          <List.Section>
            <List.Item
              title="Cliente ID"
              description={perfil?.cliente_id}
              left={() => <List.Icon icon="account" />}
            />
            <Divider />
            <List.Item
              title="Email"
              description={perfil?.email}
              left={() => <List.Icon icon="email" />}
            />
            <Divider />
            <List.Item
              title="Teléfono"
              description={perfil?.telefono || 'No registrado'}
              left={() => <List.Icon icon="phone" />}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.statsTitle}>
            Estadísticas
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text variant="headlineSmall" style={styles.statValue}>
                {perfil?.puntos || 0}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Puntos
              </Text>
            </View>
            <View style={styles.stat}>
              <Text variant="headlineSmall" style={styles.statValue}>
                {perfil?.saldo ? `$${perfil.saldo}` : '$0'}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Saldo
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor={COLORS.error}
      >
        Cerrar Sesión
      </Button>
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
    marginBottom: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
  },
  statsTitle: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  statLabel: {
    color: COLORS.gray,
    marginTop: 4,
  },
  logoutButton: {
    margin: 16,
  },
});
