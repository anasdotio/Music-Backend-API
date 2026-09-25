export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/mydb",
  
  jwtSecret: process.env.JWT_SECRET || "change-this-in-production",
};

export default config;