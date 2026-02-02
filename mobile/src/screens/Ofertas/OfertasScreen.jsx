import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { mobileApi } from '../../services/api';
import OfertaCard from '../../components/OfertaCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS } from '../../utils/constants';

export default function OfertasScreen({ navigation }) {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOfertas();
  }, []);

  const loadOfertas = async () => {
    try {
      const response = await mobileApi.getOfertas();
      setOfertas(response.data);
    } catch (error) {
      console.error('Error al cargar ofertas:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadOfertas();
  };

  const filteredOfertas = ofertas.filter((oferta) =>
    oferta.detalle.toLowerCase().includes(search.toLowerCase()) ||
    oferta.marca?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar ofertas..."
        onChangeText={setSearch}
        value={search}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredOfertas}
        renderItem={({ item }) => (
          <OfertaCard
            oferta={item}
            onPress={() => navigation.navigate('OfertaDetail', { oferta: item })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchbar: {
    margin: 16,
  },
  list: {
    paddingBottom: 16,
  },
});
