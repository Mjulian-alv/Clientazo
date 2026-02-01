import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import { testConnections } from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Import routes - Mobile
import mobileAuthRoutes from './routes/mobile/auth.js';
import mobileOfertasRoutes from './routes/mobile/ofertas.js';
import mobilePuntosRoutes from './routes/mobile/puntos.js';
import mobileCuentaCorrienteRoutes from './routes/mobile/cuentaCorriente.js';
import mobileComprasRoutes from './routes/mobile/compras.js';
import mobileClienteRoutes from './routes/mobile/cliente.js';

// Import routes - Admin
import adminAuthRoutes from './routes/admin/auth.js';
import adminDashboardRoutes from './routes/admin/dashboard.js';
import adminOfertasRoutes from './routes/admin/ofertas.js';
import adminClientesRoutes from './routes/admin/clientes.js';
import adminMovimientosRoutes from './routes/admin/movimientos.js';
import adminImportRoutes from './routes/admin/import.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: config.cors.origin }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mobile API routes
app.use('/api/mobile/auth', mobileAuthRoutes);
app.use('/api/mobile/ofertas', mobileOfertasRoutes);
app.use('/api/mobile/puntos', mobilePuntosRoutes);
app.use('/api/mobile/cuenta-corriente', mobileCuentaCorrienteRoutes);
app.use('/api/mobile/compras', mobileComprasRoutes);
app.use('/api/mobile', mobileClienteRoutes);

// Admin API routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/ofertas', adminOfertasRoutes);
app.use('/api/admin/clientes', adminClientesRoutes);
app.use('/api/admin/movimientos', adminMovimientosRoutes);
app.use('/api/admin/import', adminImportRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port;

async function startServer() {
  try {
    // Test database connections
    await testConnections();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
      console.log(`📱 Mobile API: http://localhost:${PORT}/api/mobile`);
      console.log(`💻 Admin API: http://localhost:${PORT}/api/admin`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();
