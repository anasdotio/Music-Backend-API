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
