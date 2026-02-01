import express from 'express';
import * as ofertasController from '../../controllers/ofertasController.js';

const router = express.Router();

router.get('/', ofertasController.getOfertas);
router.get('/:id', ofertasController.getOfertaById);

export default router;
