import { body, cookie } from 'express-validator';
import validate from '../middleware/validate.js';
import { REFRESH_TOKEN_COOKIE } from '../utils/auth-cookies.js';

export const registerValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email').trim().normalizeEmail().isEmail().withMessage('A valid email is required'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role').optional().isIn(['user', 'artist', 'admin']).withMessage('Invalid role'),
  validate,
];

export const loginValidation = [
  body('email').trim().normalizeEmail().isEmail().withMessage('A valid email is required'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password is required'),
  validate,
];

export const refreshValidation = [
  cookie(REFRESH_TOKEN_COOKIE)
    .isString()
    .notEmpty()
    .withMessage('Refresh token cookie is required'),
  validate,
];

export default { registerValidation, loginValidation, refreshValidation };
