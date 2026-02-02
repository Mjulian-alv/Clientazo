import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Switch,
  CircularProgress,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { formatCurrency, formatDate } from '../../utils/helpers';
import MainLayout from '../../components/Layout/MainLayout';

export default function OfertasListPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: ofertas, isLoading } = useQuery({
    queryKey: ['ofertas', search],
    queryFn: () => adminApi.getOfertas({ search }).then(res => res.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminApi.updateOferta(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['ofertas']);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminApi.deleteOferta(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['ofertas']);
    },
  });

  const handleToggleActiva = (id, activa) => {
    updateMutation.mutate({ id, data: { activa: !activa } });
  };

  const handleToggleDestacada = (id, destacada) => {
    updateMutation.mutate({ id, data: { destacada: !destacada } });
  };

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
        Gestión de Ofertas
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 2 }}>
        <TextField
          placeholder="Buscar ofertas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Detalle</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Precio Regular</TableCell>
              <TableCell>Precio Oferta</TableCell>
              <TableCell>Etiqueta</TableCell>
              <TableCell>Vigencia</TableCell>
              <TableCell align="center">Activa</TableCell>
              <TableCell align="center">Destacada</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ofertas?.map((oferta) => (
              <TableRow key={oferta.id}>
                <TableCell>{oferta.codigo}</TableCell>
                <TableCell>{oferta.detalle}</TableCell>
                <TableCell>{oferta.marca || '-'}</TableCell>
                <TableCell>{formatCurrency(oferta.precio_regular)}</TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    {formatCurrency(oferta.precio_oferta)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={oferta.etiqueta || 'N/A'}
                    size="small"
                    color={oferta.etiqueta === 'CLIENTAZO' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  {formatDate(oferta.fecha_inicio)} - {formatDate(oferta.fecha_fin)}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={oferta.activa}
                    onChange={() => handleToggleActiva(oferta.id, oferta.activa)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={oferta.destacada}
                    onChange={() => handleToggleDestacada(oferta.id, oferta.destacada)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="error" onClick={() => deleteMutation.mutate(oferta.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {ofertas?.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No se encontraron ofertas
          </Typography>
        </Box>
      )}
    </MainLayout>
  );
}
