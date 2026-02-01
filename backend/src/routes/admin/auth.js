import express from 'express';
import * as authAdminController from '../../controllers/auth/authAdminController.js';
import { loginLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', loginLimiter, authAdminController.login);

export default router;
