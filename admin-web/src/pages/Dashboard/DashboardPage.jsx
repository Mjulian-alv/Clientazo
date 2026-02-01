import React from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { LocalOffer, People, TrendingUp } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import MainLayout from '../../components/Layout/MainLayout';

function StatCard({ title, value, icon, color }) {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => adminApi.getStats().then(res => res.data),
  });

  if (isLoading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Ofertas Activas"
            value={stats?.ofertas || 0}
            icon={<LocalOffer fontSize="large" />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Clientes Registrados"
            value={stats?.clientes || 0}
            icon={<People fontSize="large" />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Ofertas Destacadas"
            value={stats?.ofertasDestacadas || 0}
            icon={<TrendingUp fontSize="large" />}
            color="#ff9800"
          />
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Bienvenido al Panel Administrativo
        </Typography>
        <Typography color="text.secondary">
          Desde aquí puedes gestionar ofertas, clientes, ver movimientos y generar reportes.
        </Typography>
      </Paper>
    </MainLayout>
  );
}
