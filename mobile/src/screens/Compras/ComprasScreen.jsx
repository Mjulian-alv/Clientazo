import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { mobileApi } from '../../services/api';
import MovimientoItem from '../../components/MovimientoItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS } from '../../utils/constants';

export default function ComprasScreen() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCompras();
  }, []);

  const loadCompras = async () => {
    try {
      const response = await mobileApi.getCompras();
      setCompras(response.data);
    } catch (error) {
      console.error('Error al cargar compras:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCompras();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (compras.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="bodyLarge" style={styles.emptyText}>
          No tienes compras registradas
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={compras}
        renderItem={({ item }) => <MovimientoItem movimiento={item} />}
        keyExtractor={(item) => item.ID.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: COLORS.gray,
    textAlign: 'center',
  },
});
