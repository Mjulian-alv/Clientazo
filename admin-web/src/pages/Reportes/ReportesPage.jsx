import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import MainLayout from '../../components/Layout/MainLayout';

export default function ReportesPage() {
  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Reportes
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Generación de Reportes
        </Typography>
        <Typography color="text.secondary">
          Esta funcionalidad estará disponible próximamente.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            • Reporte de ventas por período<br />
            • Reporte de clientes activos<br />
            • Reporte de ofertas más populares<br />
            • Reporte de puntos canjeados
          </Typography>
        </Box>
      </Paper>
    </MainLayout>
  );
}
