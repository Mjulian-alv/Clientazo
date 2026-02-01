import express from 'express';
import * as movimientosController from '../../controllers/movimientosController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, movimientosController.getCompras);
router.get('/:id', authMiddleware, movimientosController.getCompraById);

export default router;
