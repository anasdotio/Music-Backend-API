import { body, param } from 'express-validator';
import validate from '../middleware/validate.js';

export const createMusicValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters long'),
  validate,
];

export const updateMusicLikesValidator = [
  body('musicId')
    .notEmpty()
    .withMessage('Music ID is required')
    .isMongoId()
    .withMessage('Invalid Music ID format'),
  validate,
];

export const paramsIdValidator = [
  param('musicId')
    .notEmpty()
    .withMessage('Music ID is required')
    .isMongoId()
    .withMessage('Invalid Music ID format'),
  validate,
];
