import * as likeDao from '../dao/like.dao.js';
import ApiError from '../utils/api-error.js';
import * as musicDao from '../dao/music.dao.js';

export const createLike = async (likeData) => {
  const like = await likeDao.createLike(likeData);

  if (!like) {
    throw new ApiError(500, 'Like creation failed');
  }

  return like;
};

export const toggleMusicLike = async ({ musicId, userId }) => {
  const existingLike = await likeDao.findLikeByUserAndMusic(userId, musicId);

  if (existingLike) {
    await likeDao.removeLike(userId, musicId);
    await musicDao.undoLikeMusic(musicId, userId);
    return false; // Music unliked
  }
  await likeDao.createLike({ musicId, userId });
  await musicDao.likeMusic(musicId, userId);

  return !existingLike;
};
