import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Alert,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CloudUpload, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { formatDateTime } from '../../utils/helpers';
import MainLayout from '../../components/Layout/MainLayout';

export default function OfertaImportPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const queryClient = useQueryClient();

  const { data: logs } = useQuery({
    queryKey: ['import-log'],
    queryFn: () => adminApi.getImportLog().then(res => res.data),
  });

  const importMutation = useMutation({
    mutationFn: (file) => adminApi.importOfertas(file),
    onSuccess: (response) => {
      setResult({ success: true, data: response.data });
      setFile(null);
      queryClient.invalidateQueries(['import-log']);
      queryClient.invalidateQueries(['ofertas']);
      queryClient.invalidateQueries(['stats']);
    },
    onError: (error) => {
      setResult({ 
        success: false, 
        error: error.response?.data?.error || 'Error al importar archivo' 
      });
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleImport = () => {
    if (file) {
      importMutation.mutate(file);
    }
  };

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Importar Ofertas
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Cargar Archivo TXT
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Selecciona el archivo items_web.TXT para importar las ofertas. El archivo debe contener 31 campos separados por punto y coma (;).
        </Typography>

        <Box sx={{ mt: 3 }}>
          <input
            accept=".txt,.TXT"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUpload />}
            >
              Seleccionar Archivo
            </Button>
          </label>

          {file && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Archivo seleccionado: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </Alert>
              <Button
                variant="contained"
                onClick={handleImport}
                disabled={importMutation.isPending}
              >
                {importMutation.isPending ? 'Importando...' : 'Importar Ofertas'}
              </Button>
            </Box>
          )}

          {importMutation.isPending && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
            </Box>
          )}

          {result && (
            <Box sx={{ mt: 2 }}>
              {result.success ? (
                <Alert severity="success" icon={<CheckCircle />}>
                  <Typography variant="subtitle2" gutterBottom>
                    ¡Importación exitosa!
                  </Typography>
                  <Typography variant="body2">
                    Insertados: {result.data.insertados} | 
                    Actualizados: {result.data.actualizados} | 
                    Errores: {result.data.errores}
                  </Typography>
                </Alert>
              ) : (
                <Alert severity="error" icon={<ErrorIcon />}>
                  {result.error}
                </Alert>
              )}
            </Box>
          )}
        </Box>
      </Paper>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Historial de Importaciones
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Archivo</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell align="right">Procesados</TableCell>
              <TableCell align="right">Exitosos</TableCell>
              <TableCell align="right">Fallidos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs?.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{formatDateTime(log.created_at)}</TableCell>
                <TableCell>{log.archivo_nombre}</TableCell>
                <TableCell>{log.admin_username || '-'}</TableCell>
                <TableCell align="right">{log.registros_procesados}</TableCell>
                <TableCell align="right">{log.registros_exitosos}</TableCell>
                <TableCell align="right">{log.registros_fallidos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
}
