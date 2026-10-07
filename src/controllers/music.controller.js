import asyncHandler from '../utils/async-catch.js';
import * as musicService from '../services/music.service.js';
import apiResponse from '../utils/api-response.js';
import { uploadMusic } from '../services/imageKit.service.js';
import * as likeService from '../services/like.service.js';

export const getAllMusicController = asyncHandler(async (req, res) => {
  const music = await musicService.getAllMusic();

  return res
    .status(200)
    .json(apiResponse({ statusCode: 200, data: music, message: 'Music fetched successfully' }));
});

export const createMusicController = asyncHandler(async (req, res) => {
  const musicData = req.body;
  const userId = req.user?.sub;

  const { url, fileId } = await uploadMusic(req.file.buffer, req.file.originalname);

  const music = await musicService.createMusic({ ...musicData, url, fileId, userId });

  return res
    .status(201)
    .json(apiResponse({ statusCode: 201, data: music, message: 'Music created successfully' }));
});

export const toggleMusicLikeController = asyncHandler(async (req, res) => {
  const { musicId } = req.body;

  const userId = req.user?.sub;

  if (!userId) {
    return res.status(401).json(apiResponse({ statusCode: 401, message: 'Unauthorized' }));
  }

  const isLiked = await likeService.toggleMusicLike({ musicId, userId });

  return res.status(200).json(
    apiResponse({
      statusCode: 200,
      data: { isLiked },
      message: isLiked ? 'Music unliked successfully' : 'Music liked successfully',
    })
  );
});

export const getMusicByIdController = asyncHandler(async (req, res) => {
  const { musicId } = req.params;

  const music = await musicService.getMusicById(musicId);

  return res
    .status(200)
    .json(apiResponse({ statusCode: 200, data: music, message: 'Music fetched successfully' }));
});
