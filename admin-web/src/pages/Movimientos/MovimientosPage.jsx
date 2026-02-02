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
  CircularProgress,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { formatCurrency, formatDate } from '../../utils/helpers';
import MainLayout from '../../components/Layout/MainLayout';

export default function MovimientosPage() {
  const [clienteId, setClienteId] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  const { data: movimientos, isLoading, refetch } = useQuery({
    queryKey: ['movimientos', clienteId, fechaDesde, fechaHasta],
    queryFn: () => adminApi.getMovimientos({
      cliente_id: clienteId || undefined,
      fechaDesde: fechaDesde || undefined,
      fechaHasta: fechaHasta || undefined,
    }).then(res => res.data),
    enabled: false,
  });

  const handleSearch = () => {
    refetch();
  };

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Movimientos
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            label="ID Cliente"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          />
          <TextField
            label="Desde"
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hasta"
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            startIcon={<Search />}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Box>
      </Paper>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {movimientos && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="right">Monto Total</TableCell>
                <TableCell align="right">Puntos</TableCell>
                <TableCell align="right">Saldo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movimientos.map((mov) => (
                <TableRow key={mov.ID}>
                  <TableCell>{mov.ID}</TableCell>
                  <TableCell>{mov.productoConSaldoDelCliente}</TableCell>
                  <TableCell>{formatDate(mov.FECHAREGISTRO)}</TableCell>
                  <TableCell>{mov.HORAREGISTRO}</TableCell>
                  <TableCell>{mov.TIPOMOVIMIENTO}</TableCell>
                  <TableCell align="right">{formatCurrency(mov.MONTOTOTAL)}</TableCell>
                  <TableCell align="right">{mov.MONTOACUMACTUAL}</TableCell>
                  <TableCell align="right">{formatCurrency(mov.SALDO)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {movimientos && movimientos.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No se encontraron movimientos con los criterios especificados
          </Typography>
        </Box>
      )}

      {!movimientos && !isLoading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            Utiliza los filtros para buscar movimientos
          </Typography>
        </Box>
      )}
    </MainLayout>
  );
}
