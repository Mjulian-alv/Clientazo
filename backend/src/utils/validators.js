import { body, param, query, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const registerValidation = [
  body('cliente_id').isNumeric().withMessage('ID de cliente inválido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const ofertaValidation = [
  body('codigo').isNumeric().withMessage('El código debe ser numérico'),
  body('detalle').notEmpty().withMessage('Detalle requerido'),
  body('precio_oferta').isDecimal().withMessage('El precio debe ser un número decimal válido'),
];
