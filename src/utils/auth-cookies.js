import config from '../config/index.js';

export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';

const cookieOptions = {
  httpOnly: true,
  secure: config.nodeEnv === 'production',
  sameSite: 'strict',
  path: '/',
};

export const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, cookieOptions);
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, cookieOptions);
};

export const clearAuthCookies = (res) => {
  res.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions);
  res.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions);
};

export default { setAuthCookies, clearAuthCookies };
