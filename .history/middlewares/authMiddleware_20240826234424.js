import jwt from 'jsonwebtoken';
import { CustomError } from './errorHandlerMiddleware.js'; // Custom error handling

// Middleware to verify JWT and extract user information
const authMiddleware = (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
      // If no token is found, throw an unauthorized error
      throw new CustomError('Authentication token not found', 401);
    }

    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object for use in the route handlers
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors and other exceptions
    next(new CustomError('Invalid or expired token', 401));
  }
};

export default authMiddleware;
