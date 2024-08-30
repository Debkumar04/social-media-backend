// routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Route to handle user registration
router.post('/register', registerUser);

// Route to handle user login
router.post('/lig', signin);

export default router;
