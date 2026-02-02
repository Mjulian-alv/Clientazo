import express from 'express';
import * as puntosController from '../../controllers/puntosController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, puntosController.getPuntos);
router.get('/historial', authMiddleware, puntosController.getHistorialPuntos);

export default router;
