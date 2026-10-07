import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import * as musicController from '../controllers/music.controller.js';
import { hasRole } from '../middleware/hasRole.js';
import {
  createMusicValidator,
  paramsIdValidator,
  updateMusicLikesValidator,
} from '../validators/music.validator.js';
import upload from '../config/multer.js';

const musicRouter = Router();

musicRouter.get('/', musicController.getAllMusicController);

musicRouter.post(
  '/',
  authenticate,
  hasRole('artist'),
  upload.single('audio'),
  createMusicValidator,
  musicController.createMusicController
);

musicRouter.post(
  '/like',
  authenticate,
  hasRole('user', 'artist'),
  updateMusicLikesValidator,
  musicController.toggleMusicLikeController
);

musicRouter.get(
  '/:musicId',
  authenticate,
  paramsIdValidator,
  musicController.getMusicByIdController
);

export default musicRouter;
