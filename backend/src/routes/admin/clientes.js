import express from 'express';
import { dbLocal } from '../../config/database.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';

const router = express.Router();

// Todas las rutas requieren auth de admin
router.use(authMiddleware, adminMiddleware);

// Obtener todos los clientes registrados
router.get('/', async (req, res) => {
  try {
    const [clientes] = await dbLocal.query(
      `SELECT id, cliente_id, email, telefono, activo, created_at, ultimo_acceso 
       FROM clientes_auth 
       ORDER BY created_at DESC`
    );
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Obtener cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const [clientes] = await dbLocal.query(
      `SELECT id, cliente_id, email, telefono, activo, created_at, ultimo_acceso 
       FROM clientes_auth 
       WHERE cliente_id = ?`,
      [req.params.id]
    );
    
    if (clientes.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    
    res.json(clientes[0]);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
});

export default router;
