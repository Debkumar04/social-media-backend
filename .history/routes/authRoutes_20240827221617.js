// routes/authRoutes.js

import express from 'express';
import { signup, signin } from '../controllers/authController.js';

const router = express.Router();

// Route to handle user registration
router.post('/signup', signup);

// Route to handle user login
router.post('/signin', signin);

export default router;
