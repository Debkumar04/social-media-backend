import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Function to generate a JWT token
export const generateToken = (userId) => {
  const payload = { id: userId };
  const options = { expiresIn: '1h' }; // Token expires in 1 hour

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Function to verify a JWT token
export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};
