import { validationResult } from 'express-validator';
import ApiError from '../utils/api-error.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ApiError(
        400,
        'Validation failed',
        errors.array().map(({ path, msg, value }) => ({
          path,
          message: msg,
          ...(path !== 'password' && path !== 'refreshToken' ? { value } : {}),
        }))
      )
    );
  }

  next();
};

export default validate;
