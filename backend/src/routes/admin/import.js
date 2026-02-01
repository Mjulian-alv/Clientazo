import express from 'express';
import * as importController from '../../controllers/importController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

// Todas las rutas requieren auth de admin
router.use(authMiddleware, adminMiddleware);

router.post('/ofertas', upload.single('file'), importController.importTxtFile);
router.get('/log', importController.getImportLog);

export default router;
