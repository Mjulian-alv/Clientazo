import express from 'express';
import * as ofertasController from '../../controllers/ofertasController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';

const router = express.Router();

// Todas las rutas requieren auth de admin
router.use(authMiddleware, adminMiddleware);

router.get('/', ofertasController.getOfertas);
router.get('/:id', ofertasController.getOfertaById);
router.put('/:id', ofertasController.updateOferta);
router.delete('/:id', ofertasController.deleteOferta);

export default router;
