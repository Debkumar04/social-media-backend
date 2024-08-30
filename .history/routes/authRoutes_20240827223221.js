// routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Route to handle user registration
router.post('/register', signup);

// Route to handle user login
router.post('/signin', signin);

export default router;
