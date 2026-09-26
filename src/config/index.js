export const config = {
  port: process.env.PORT || 8002,
  nodeEnv: process.env.NODE_ENV,
  corsOrigin: process.env.CORS_ORIGIN,
  apiPrefix: process.env.API_PREFIX,
  mongodbUri: process.env.MONGODB_URI,

  // Auth secrets and expiries
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
  imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
};

export default config;
