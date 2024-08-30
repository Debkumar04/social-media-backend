import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; // Import the authMiddleware if needed

const router = express.Router();

// Route for user registration
router.post('/signup', registerUser);

// Route for user login
router.post('/signin', loginUser);

// Route for user logout
router.get('/logout', logoutUser);

export default router;
