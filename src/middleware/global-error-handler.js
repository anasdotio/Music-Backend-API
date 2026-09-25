import ApiError from "../utils/api-error.js";

export const globalErrorHandler = (err, req, res, next) => {
  let error = err;
  const statusCode = error?.statusCode || 500;

  // Convert non-ApiError to ApiError
  if (!(error instanceof ApiError)) {
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message);
  }

  if (process.env.NODE_ENV !== "test") {
    console.error(`[${req.method}] ${req.originalUrl}`, error.message);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export default globalErrorHandler;