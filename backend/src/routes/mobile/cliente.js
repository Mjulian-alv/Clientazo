import express from 'express';
import * as clienteController from '../../controllers/clienteController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/perfil', authMiddleware, clienteController.getPerfil);
router.put('/perfil', authMiddleware, clienteController.updatePerfil);
router.get('/tarjeta', authMiddleware, clienteController.getTarjeta);

export default router;
