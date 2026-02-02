import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api/admin`,
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const adminApi = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Dashboard
  getStats: () => api.get('/dashboard/stats'),
  
  // Clientes
  getClientes: () => api.get('/clientes'),
  getCliente: (id) => api.get(`/clientes/${id}`),
  
  // Ofertas
  getOfertas: (params) => api.get('/ofertas', { params }),
  getOferta: (id) => api.get(`/ofertas/${id}`),
  updateOferta: (id, data) => api.put(`/ofertas/${id}`, data),
  deleteOferta: (id) => api.delete(`/ofertas/${id}`),
  
  // Import
  importOfertas: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/import/ofertas', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getImportLog: () => api.get('/import/log'),
  
  // Movimientos
  getMovimientos: (params) => api.get('/movimientos', { params }),
};

export default api;
