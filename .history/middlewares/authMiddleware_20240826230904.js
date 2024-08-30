import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const authMiddleware = (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies.token;

  // Check if token is present
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError('Invalid token! Please log in again.', 403));
    }

    // If token is valid, store user information in request object
    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;
