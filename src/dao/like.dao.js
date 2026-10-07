import likeModel from '../models/like.model.js';

export const createLike = async (likeData) => {
  return await likeModel.create({
    user: likeData.userId,
    music: likeData.musicId,
  });
};

export const findLikeByUserAndMusic = async (userId, musicId) => {
  return await likeModel.findOne({
    user: userId,
    music: musicId,
  });
};

export const removeLike = async (userId, musicId) => {
  return await likeModel.findOneAndDelete({
    user: userId,
    music: musicId,
  });
};
