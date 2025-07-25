require("dotenv").config();

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT) || 3000,
  apiVersion: process.env.API_VERSION || "v1",

  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || "tech_gadgets_inventory",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "fallback-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },

  rateLimit: {
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:4200",
  },
};

module.exports = config;
