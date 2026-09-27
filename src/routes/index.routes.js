import { Router } from 'express';
import authRouter from './auth.routes.js';
import musicRouter from './music.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/music', musicRouter);

export default router;
