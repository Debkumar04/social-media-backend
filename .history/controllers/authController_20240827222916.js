import { generateToken } from '../utils/tokenUtils.js';
import CustomError  from '../utils/customError.js';
import { createUser, getUserByEmail } from '../models/user.js'; // Import from the user model

/**
 * Handle user registration
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password) {
    return next(new CustomError('Please provide all required fields.', 400));
  }

  try {
    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return next(new CustomError('User already exists with this email.', 400));
    }

    // Create new user
    const newUser = createUser({ name, email, password });

    // Generate JWT token
    const token = generateToken(newUser.id);

    // Send response
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully!',
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle user login
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if all required fields are provided
  if (!email || !password) {
    return next(new CustomError('Please provide both email and password.', 400));
  }

  try {
    // Check if user exists
    const user = getUserByEmail(email);
    if (!user || user.password !== password) {
      return next(new CustomError('Invalid email or password.', 401));
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Login successful!',
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
