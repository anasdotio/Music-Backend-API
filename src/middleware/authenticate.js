import ApiError from '../utils/api-error.js';
import asyncHandler from '../utils/async-catch.js';
import { verifyToken } from '../utils/jwt-utils.js';
import { ACCESS_TOKEN_COOKIE } from '../utils/auth-cookies.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization') || '';
    const [scheme, headerToken] = authHeader.split(' ');
    const token = req.cookies?.[ACCESS_TOKEN_COOKIE] || headerToken;

    if ((!req.cookies?.[ACCESS_TOKEN_COOKIE] && scheme !== 'Bearer') || !token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = verifyToken(token);

    // You can fetch user from database here
    req.user = decodedToken;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Access token expired');
    }

    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid access token');
    }

    throw new ApiError(401, error?.message || 'Invalid access token');
  }
});

export default authenticate;
