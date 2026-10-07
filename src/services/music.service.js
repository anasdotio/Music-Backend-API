import * as musicDao from '../dao/music.dao.js';
import ApiError from '../utils/api-error.js';

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

export const getMusicById = async (musicId) => {
  const music = await musicDao.getMusicById(musicId);

  if (!music) {
    throw new ApiError(404, 'Music not found');
  }

  return music;
};
