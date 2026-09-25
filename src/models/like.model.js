import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    music: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Music',
      required: [true, 'Music is required'],
    },
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);
export default Like;
