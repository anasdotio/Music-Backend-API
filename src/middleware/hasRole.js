import ApiError from '../utils/api-error.js';

export const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden: Insufficient role');
    }
    next();
  };
};
