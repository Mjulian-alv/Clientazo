import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../utils/constants';

const api = axios.create({
  baseURL: `${API_URL}/api/mobile`,
});

// Interceptor para agregar token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('user_token');
      await AsyncStorage.removeItem('user_data');
      // Aquí podrías navegar al login si tienes acceso al navigation
    }
    return Promise.reject(error);
  }
);

export const mobileApi = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  
  // Ofertas
  getOfertas: (params) => api.get('/ofertas', { params }),
  getOferta: (id) => api.get(`/ofertas/${id}`),
  
  // Puntos
  getPuntos: () => api.get('/puntos'),
  getHistorialPuntos: () => api.get('/puntos/historial'),
  
  // Cuenta Corriente
  getSaldo: () => api.get('/cuenta-corriente'),
  getMovimientos: (params) => api.get('/cuenta-corriente/movimientos', { params }),
  
  // Compras
  getCompras: (params) => api.get('/compras', { params }),
  getCompra: (id) => api.get(`/compras/${id}`),
  
  // Perfil
  getPerfil: () => api.get('/perfil'),
  updatePerfil: (data) => api.put('/perfil', data),
  getTarjeta: () => api.get('/tarjeta'),
};

export default api;
