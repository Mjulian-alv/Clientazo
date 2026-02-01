import express from 'express';
import * as authAdminController from '../../controllers/auth/authAdminController.js';

const router = express.Router();

router.post('/login', authAdminController.login);

export default router;
