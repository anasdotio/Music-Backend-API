import getImageKitClient from '../config/imageKit.js';
import * as musicDao from '../dao/music.dao.js';

export const getAllMusic = async () => {
  return await musicDao.getAllMusic();
};

export const createMusic = async (data) => {
  const music = await musicDao.createMusic({
    ...data,
    artist: data.userId,
    audio: { url: data.url, fileId: data.fileId },
  });

  if (!music) {
    throw new ApiError(500, 'Music creation failed');
  }

  return music;
};

export const undoLikeMusic = async (musicId, userId) => {
  const music = await musicDao.getMusicById(musicId);

  if (!music) {
    throw new ApiError(404, 'Music not found');
  }

  const updatedMusic = await musicDao.undoLikeMusic(musicId, userId);

  if (!updatedMusic) {
    throw new ApiError(500, 'Failed to undo like music');
  }

  return updatedMusic;
};

export const likeMusic = async (musicId, userId) => {
  const music = await musicDao.getMusicById(musicId);

  if (!music) {
    throw new ApiError(404, 'Music not found');
  }

  const updatedMusic = await musicDao.likeMusic(musicId, userId);

  if (!updatedMusic) {
    throw new ApiError(500, 'Failed to like music');
  }

  return updatedMusic;
};

export const getMusicById = async (musicId) => {
  const music = await musicDao.getMusicById(musicId);

  if (!music) {
    throw new ApiError(404, 'Music not found');
  }

  return music;
};
