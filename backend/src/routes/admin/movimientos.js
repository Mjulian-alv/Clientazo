import express from 'express';
import { dbRemote } from '../../config/database.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';

const router = express.Router();

// Todas las rutas requieren auth de admin
router.use(authMiddleware, adminMiddleware);

// Obtener movimientos con filtros
router.get('/', async (req, res) => {
  try {
    let query = 'SELECT * FROM movimientos WHERE 1=1';
    const params = [];
    
    if (req.query.cliente_id) {
      query += ' AND productoConSaldoDelCliente = ?';
      params.push(req.query.cliente_id);
    }
    
    if (req.query.fechaDesde) {
      query += ' AND FECHAREGISTRO >= ?';
      params.push(req.query.fechaDesde);
    }
    
    if (req.query.fechaHasta) {
      query += ' AND FECHAREGISTRO <= ?';
      params.push(req.query.fechaHasta);
    }
    
    query += ' ORDER BY FECHAREGISTRO DESC, HORAREGISTRO DESC LIMIT 100';
    
    const [movimientos] = await dbRemote.query(query, params);
    res.json(movimientos);
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
});

export default router;
