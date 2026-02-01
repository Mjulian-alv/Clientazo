import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Chip,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { formatDateTime } from '../../utils/helpers';
import MainLayout from '../../components/Layout/MainLayout';

export default function ClientesListPage() {
  const { data: clientes, isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => adminApi.getClientes().then(res => res.data),
  });

  if (isLoading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Clientes Registrados
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Cliente</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Último Acceso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes?.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.cliente_id}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefono || '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={cliente.activo ? 'Activo' : 'Inactivo'}
                    color={cliente.activo ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDateTime(cliente.created_at)}</TableCell>
                <TableCell>{formatDateTime(cliente.ultimo_acceso)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {clientes?.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No hay clientes registrados
          </Typography>
        </Box>
      )}
    </MainLayout>
  );
}
