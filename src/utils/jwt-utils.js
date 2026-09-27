import jwt from 'jsonwebtoken';
import ApiError from './api-error.js';
import config from '../config/index.js';
import crypto from 'crypto';

/**
 * Generate a JWT access token.
 *
 * @param {Object} payload - The payload to embed in the token.
 * @param {string|number} [expiresIn=config.accessTokenExpiry] - Expiration time (e.g., '15m', '1h').
 * @returns {string} Signed JWT access token.
 */
export const generateAccessToken = (payload, expiresIn = config.accessTokenExpiry) => {
  if (!payload || typeof payload !== 'object') {
    throw new TypeError('Payload must be a non‑empty object');
  }

  console.log(config.accessTokenSecret, 'Access Token Secret'); // Debugging line

  return jwt.sign(payload, config.accessTokenSecret, { expiresIn });
};

/**
 * Generate a JWT refresh token.
 *
 * @param {Object} payload - The payload to embed in the token.
 * @param {string|number} [expiresIn=config.refreshTokenExpiry] - Expiration time.
 * @returns {string} Signed JWT refresh token.
 */
export const generateRefreshToken = (payload, expiresIn = config.refreshTokenExpiry) => {
  if (!payload || typeof payload !== 'object') {
    throw new TypeError('Payload must be a non‑empty object');
  }
  return jwt.sign(payload, config.refreshTokenSecret, { expiresIn });
};

/**
 * Verify a JWT and return its decoded payload.
 *
 * @param {string} token - JWT string.
 * @returns {Object} Decoded token payload.
 * @throws {ApiError} When the token is missing, expired, malformed, or otherwise invalid.
 */
export const verifyToken = (token) => {
  if (!token) {
    throw new ApiError(401, 'Access token missing');
  }

  try {
    return jwt.verify(token, config.accessTokenSecret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Access token expired');
    }
    if (err.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid access token');
    }
    // Fallback for any other JWT‑related errors
    throw new ApiError(401, err.message ?? 'Invalid access token');
  }
};

export const verifyRefreshToken = (token) => {
  if (!token) {
    throw new ApiError(401, 'Refresh token missing');
  }

  try {
    return jwt.verify(token, config.refreshTokenSecret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Refresh token expired');
    }
    throw new ApiError(401, 'Invalid refresh token');
  }
};

export const hashRefreshToken = (refreshToken) => {
  if (!refreshToken || typeof refreshToken !== 'string') {
    throw new TypeError('Refresh token must be a non‑empty string');
  }
  // return require('crypto').cr  eateHash('sha256').update(refreshToken).digest('hex');
  return crypto.createHash('sha256').update(refreshToken).digest('hex');
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  hashRefreshToken,
};
