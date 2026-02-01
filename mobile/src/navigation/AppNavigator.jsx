import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home/HomeScreen';
import OfertasScreen from '../screens/Ofertas/OfertasScreen';
import TarjetaScreen from '../screens/Tarjeta/TarjetaScreen';
import ComprasScreen from '../screens/Compras/ComprasScreen';
import PerfilScreen from '../screens/Perfil/PerfilScreen';
import { COLORS } from '../utils/constants';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Ofertas') {
            iconName = 'tag-multiple';
          } else if (route.name === 'Tarjeta') {
            iconName = 'card-account-details';
          } else if (route.name === 'Compras') {
            iconName = 'receipt';
          } else if (route.name === 'Perfil') {
            iconName = 'account';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Ofertas" component={OfertasScreen} />
      <Tab.Screen name="Tarjeta" component={TarjetaScreen} />
      <Tab.Screen name="Compras" component={ComprasScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
