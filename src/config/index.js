export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb',

  // Auth secrets and expiries
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'change-this-in-production',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'change-this-in-production',
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
};

export default config;
