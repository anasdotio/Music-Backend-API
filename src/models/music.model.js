import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title must be at least 1 character long'],
      maxlength: [100, 'Title must be at most 100 characters long'],
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Artist is required'],
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },
    audio: {
      url: {
        type: String,
        required: [true, 'Audio URL is required'],
      },
      fileId: {
        type: String,
        required: [true, 'Audio file ID is required'],
      },
    },

    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Music = mongoose.model('Music', musicSchema);

export default Music;
