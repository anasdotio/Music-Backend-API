import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ApiError from './utils/api-error.js';
import apiResponse from './utils/api-response.js';
import globalErrorHandler from './middleware/global-error-handler.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.status(200).json(apiResponse({ message: 'Welcome to Music-Backend-API API' }));
});

app.get('/health', (req, res) => {
  res.status(200).json(
    apiResponse({
      data: { status: 'ok', timestamp: new Date().toISOString() },
      message: 'Service healthy',
    })
  );
});

app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

app.use(globalErrorHandler);

export default app;
