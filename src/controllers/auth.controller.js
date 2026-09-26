import asyncHandler from '../utils/async-catch.js';
import apiResponse from '../utils/api-response.js';
import * as authService from '../services/auth.service.js';
import { clearAuthCookies, REFRESH_TOKEN_COOKIE, setAuthCookies } from '../utils/auth-cookies.js';

export const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  const { accessToken, refreshToken, ...responseData } = data;
  setAuthCookies(res, { accessToken, refreshToken });
  res
    .status(201)
    .json(apiResponse({ statusCode: 201, data: responseData, message: 'Registration successful' }));
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  const { accessToken, refreshToken, ...responseData } = data;
  setAuthCookies(res, { accessToken, refreshToken });
  res.status(200).json(apiResponse({ data: responseData, message: 'Login successful' }));
});

export const refresh = asyncHandler(async (req, res) => {
  const data = await authService.refresh(req.cookies[REFRESH_TOKEN_COOKIE]);
  const { accessToken, refreshToken, ...responseData } = data;
  setAuthCookies(res, { accessToken, refreshToken });
  res.status(200).json(apiResponse({ data: responseData, message: 'Tokens refreshed' }));
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user.id);
  clearAuthCookies(res);
  res.status(200).json(apiResponse({ message: 'Logout successful' }));
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.sub);
  res.status(200).json(apiResponse({ data: user, message: 'Current user retrieved' }));
});

export default { register, login, refresh, logout, me };
