import User from '../models/user.model.js';
/**
 * Create a new user document.
 *
 * @param {Object} userData - Object containing username, email, password, role.
 * @returns {Promise<Object>} The created user document.
 */
export const createUser = async (userData) => {
  // Directly create and return the user; errors are not caught here.
  return await User.create(userData);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (userId) => {
  return await User.findById(userId);
};

export const saveRefreshToken = async (userId, refreshToken) => {
  return await User.findByIdAndUpdate(userId, { refreshToken }, { new: true, runValidators: true });
};

export const removeRefreshToken = async (userId) => {
  return await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } }, { new: true });
};

export default {
  createUser,
  findUserByEmail,
  findUserById,
  saveRefreshToken,
  removeRefreshToken,
};
