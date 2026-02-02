import express from 'express';
import { dbLocal, dbRemote } from '../../config/database.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';

const router = express.Router();

// Todas las rutas requieren auth de admin
router.use(authMiddleware, adminMiddleware);

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    // Contar ofertas activas
    const [ofertas] = await dbLocal.query(
      'SELECT COUNT(*) as total FROM ofertas WHERE activa = true'
    );
    
    // Contar clientes registrados
    const [clientes] = await dbLocal.query(
      'SELECT COUNT(*) as total FROM clientes_auth WHERE activo = true'
    );
    
    // Ofertas destacadas
    const [destacadas] = await dbLocal.query(
      'SELECT COUNT(*) as total FROM ofertas WHERE activa = true AND destacada = true'
    );
    
    res.json({
      ofertas: ofertas[0].total,
      clientes: clientes[0].total,
      ofertasDestacadas: destacadas[0].total,
    });
  } catch (error) {
    console.error('Error al obtener stats:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

export default router;
