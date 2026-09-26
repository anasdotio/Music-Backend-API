import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import {
  loginValidation,
  refreshValidation,
  registerValidation,
} from '../validators/auth.validator.js';
import { login, logout, me, refresh, register } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/register', registerValidation, register);
authRouter.post('/login', loginValidation, login);
authRouter.post('/refresh', refreshValidation, refresh);
authRouter.post('/logout', authenticate, logout);
authRouter.get('/me', authenticate, me);

export default authRouter;
