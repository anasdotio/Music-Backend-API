import asyncHandler from '../utils/async-catch.js';
import * as musicService from '../services/music.service.js';
import apiResponse from '../utils/api-response.js';
import { uploadMusic } from '../services/imageKit.service.js';
export const createMusicController = asyncHandler(async (req, res) => {
  const musicData = req.body;
  const userId = req.user?.sub;

  const { url, fileId } = await uploadMusic(req.file.buffer, req.file.originalname);

  const music = await musicService.createMusic({ ...musicData, url, fileId, userId });

  return res
    .status(201)
    .json(apiResponse({ statusCode: 201, data: music, message: 'Music created successfully' }));
});
