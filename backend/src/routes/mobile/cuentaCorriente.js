import express from 'express';
import * as cuentaCorrienteController from '../../controllers/cuentaCorrienteController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, cuentaCorrienteController.getSaldo);
router.get('/movimientos', authMiddleware, cuentaCorrienteController.getMovimientos);

export default router;
