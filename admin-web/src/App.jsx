import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

// Pages
import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import OfertasListPage from './pages/Ofertas/OfertasListPage';
import OfertaImportPage from './pages/Ofertas/OfertaImportPage';
import ClientesListPage from './pages/Clientes/ClientesListPage';
import MovimientosPage from './pages/Movimientos/MovimientosPage';
import ReportesPage from './pages/Reportes/ReportesPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function PrivateRoute({ children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return admin ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ofertas"
        element={
          <PrivateRoute>
            <OfertasListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ofertas/import"
        element={
          <PrivateRoute>
            <OfertaImportPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/clientes"
        element={
          <PrivateRoute>
            <ClientesListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/movimientos"
        element={
          <PrivateRoute>
            <MovimientosPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reportes"
        element={
          <PrivateRoute>
            <ReportesPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AdminAuthProvider>
            <AppRoutes />
          </AdminAuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
