import bcrypt from 'bcrypt';
import ApiError from '../utils/api-error.js';
import {
  createUser,
  findUserByEmail,
  findUserById,
  removeRefreshToken,
  saveRefreshToken,
} from '../dao/auth.dao.js';
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt-utils.js';

const sanitizeUser = (user) => ({
  id: user._id.toString(),
  username: user.username,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const createTokenPair = async (user) => {
  const payload = { sub: user._id.toString(), role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ sub: payload.sub });

  await saveRefreshToken(user._id, hashRefreshToken(refreshToken));

  return { accessToken, refreshToken };
};

export const register = async ({ username, email, password, role }) => {
  if (await findUserByEmail(email)) {
    throw new ApiError(409, 'Email is already registered');
  }

  const user = await createUser({
    username,
    email,
    password: await bcrypt.hash(password, 12),
    ...(role ? { role } : {}),
  });

  if (!user) {
    throw new ApiError(500, 'User registration failed');
  }

  const tokens = await createTokenPair(user);
  return { user: sanitizeUser(user), ...tokens };
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password || '', user.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const tokens = await createTokenPair(user);
  return { user: sanitizeUser(user), ...tokens };
};

export const refresh = async (refreshToken) => {
  const payload = verifyRefreshToken(refreshToken);
  const user = await findUserById(payload.sub);

  if (!user || !user.refreshToken || user.refreshToken !== hashRefreshToken(refreshToken)) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const tokens = await createTokenPair(user);
  return { user: sanitizeUser(user), ...tokens };
};

export const logout = async (userId) => {
  await removeRefreshToken(userId);
};

export const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(401, 'User no longer exists');
  }
  return sanitizeUser(user);
};

export default { register, login, refresh, logout, getCurrentUser };
