import express from 'express';
import * as authController from '../../controllers/auth/authClienteController.js';
import { loginValidation, registerValidation, validateRequest } from '../../utils/validators.js';

const router = express.Router();

router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/refresh', authController.refresh);

export default router;
