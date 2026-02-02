import express from 'express';
import * as authController from '../../controllers/auth/authClienteController.js';
import { loginValidation, registerValidation, validateRequest } from '../../utils/validators.js';
import { loginLimiter, registerLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', loginLimiter, loginValidation, validateRequest, authController.login);
router.post('/register', registerLimiter, registerValidation, validateRequest, authController.register);
router.post('/refresh', authController.refresh);

export default router;
