import ApiError from '../utils/api-error.js';

const isSensitivePath = (path) => path === 'password' || path === 'refreshToken';

const fieldError = (path, message, value) => ({
  path,
  message,
  ...(!isSensitivePath(path) && value !== undefined ? { value } : {}),
});

export const globalErrorHandler = (err, req, res, next) => {
  let error = err;

  if (error?.name === 'ValidationError') {
    error = new ApiError(
      400,
      'Validation failed',
      Object.values(error.errors || {}).map(({ path, message, value }) =>
        fieldError(path, message, value)
      )
    );
  } else if (error?.code === 11000 || error?.code === 11001) {
    const duplicateFields = Object.entries(error.keyValue || {});
    const duplicateErrors = duplicateFields.length
      ? duplicateFields.map(([path, value]) => fieldError(path, `${path} already exists`, value))
      : [fieldError('unknown', 'A value already exists')];

    error = new ApiError(409, 'Duplicate value', duplicateErrors);
  } else if (error?.name === 'CastError') {
    error = new ApiError(400, 'Invalid value', [
      fieldError(error.path, `Invalid ${error.path}`, error.value),
    ]);
  } else if (error?.code === 121) {
    error = new ApiError(400, 'Document validation failed');
  }

  // Convert non-ApiError to ApiError
  if (!(error instanceof ApiError)) {
    const message = error.message || 'Something went wrong';
    error = new ApiError(500, message);
  }

  const statusCode = error?.statusCode || 500;

  if (process.env.NODE_ENV !== 'test') {
    console.error(`[${req.method}] ${req.originalUrl}`, error.message);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

export default globalErrorHandler;
