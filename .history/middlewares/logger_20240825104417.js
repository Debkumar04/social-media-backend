import winston from 'winston';
import path from 'path';

// Define the log file path
const logFilePath = path.join(process.cwd(), 'log.txt');

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(), // Adds timestamp to log entries
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: logFilePath }), // Log to file
    new winston.transports.Console() // Also log to console (optional)
  ]
});

// Middleware to log requests
const loggerMiddleware = (req, res, next) => {
  const { method, url } = req;
  logger.info(`Method: ${method}, Route: ${url}`);
  next();
};

export default loggerMiddleware;
