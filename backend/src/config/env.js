import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  dbRemote: {
    host: process.env.DB_REMOTE_HOST,
    port: process.env.DB_REMOTE_PORT || 3306,
    user: process.env.DB_REMOTE_USER,
    password: process.env.DB_REMOTE_PASSWORD,
    database: process.env.DB_REMOTE_DATABASE,
  },
  
  dbLocal: {
    host: process.env.DB_LOCAL_HOST || 'localhost',
    port: process.env.DB_LOCAL_PORT || 3306,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_DATABASE,
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
  },
};
