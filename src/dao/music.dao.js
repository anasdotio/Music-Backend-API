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

export const likeMusic = async (musicId, session) => {
  return await musicModel
    .findByIdAndUpdate(musicId, { $inc: { likeCount: 1 } }, { new: true, session })
    .select('_id likeCount');
};

export const undoLikeMusic = async (musicId, session) => {
  return await musicModel
    .findByIdAndUpdate(musicId, { $inc: { likeCount: -1 } }, { new: true, session })
    .select('_id likeCount');
};
