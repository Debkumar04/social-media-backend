// controllers/authController.js

import { createUser, getUserByEmail } from '../models/user.js';
import { generateToken } from '../utils/tokenUtils.js';
import { AppError } from '../middlewares/errorHandler.js';
import bcrypt from 'bcrypt';

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || )

    // Check if the user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return next(new AppError('User with this email already exists', 400));
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = createUser({ email, password: hashedPassword });

    // Generate a token for the user
    const token = generateToken(newUser.id);

    // Set token in a cookie
    res.cookie('token', token, { httpOnly: true });

    // Respond with the new user data (excluding the password)
    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Log in an existing user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = getUserByEmail(email);
    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Generate a token for the user
    const token = generateToken(user.id);

    // Set token in a cookie
    res.cookie('token', token, { httpOnly: true });

    // Respond with the user data (excluding the password)
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Log out a user by clearing the token cookie
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logoutUser = (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  res.status(200).json({
    status: 'success',
    message: 'User logged out successfully',
  });
};

export { registerUser, loginUser, logoutUser };
