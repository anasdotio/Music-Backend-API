import likeModel from '../models/like.model.js';

export const createLike = async (data, session) => {
  return await likeModel.create(
    [
      {
        music: data.musicId,
        user: data.userId,
      },
    ],
    { session }
  );
};

export const findLikeByUserAndMusic = async (userId, musicId, session) => {
  return await likeModel.findOne(
    {
      user: userId,
      music: musicId,
    },
    { null: 0 },
    { session }
  );
};

export const removeLike = async (userId, musicId, session) => {
  return await likeModel.deleteOne(
    {
      user: userId,
      music: musicId,
    },
    null,
    { session }
  );
};
