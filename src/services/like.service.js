import * as likeDao from '../dao/like.dao.js';
import ApiError from '../utils/api-error.js';
import * as musicDao from '../dao/music.dao.js';
import { startSession } from 'mongoose';

export const createLike = async (likeData) => {
  const like = await likeDao.createLike(likeData);

  if (!like) {
    throw new ApiError(500, 'Like creation failed');
  }

  return like;
};

export const toggleMusicLike = async ({ musicId, userId }) => {
  const session = await startSession();
  try {
    const result = await session.withTransaction(async () => {
      const existingLike = await likeDao.findLikeByUserAndMusic(userId, musicId, session);

      // UNLIKE
      if (existingLike) {
        await likeDao.removeLike(userId, musicId, session);
        const music = await musicDao.undoLikeMusic(musicId, session);

        if (!music) {
          throw new ApiError(404, 'Music not found');
        }

        return {
          musicId: music._id,
          isLiked: false,
          likeCount: music.likeCount,
        };
      }

      //LIKE
      await likeDao.createLike({ musicId, userId }, session);
      const music = await musicDao.likeMusic(musicId, session);

      if (!music) {
        throw new ApiError(404, 'Music not found');
      }

      return {
        musicId: music._id,
        isLiked: true,
        likeCount: music.likeCount,
      };
    });
    return result;
  } finally {
    await session.endSession();
  }
};
