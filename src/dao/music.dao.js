import musicModel from '../models/music.model.js';

export const getAllMusic = async () => {
  return await musicModel.find();
};

export const getMusicById = async (id) => {
  return await musicModel.findById(id);
};

export const createMusic = async (musicData) => {
  return await musicModel.create(musicData);
};

export const likeMusic = async (musicId, userId) => {
  return await musicModel.findByIdAndUpdate(musicId, { $inc: { likeCount: 1 } }, { new: true });
};

export const undoLikeMusic = async (musicId, userId) => {
  return await musicModel.findByIdAndUpdate(musicId, { $inc: { likeCount: -1 } }, { new: true });
};
