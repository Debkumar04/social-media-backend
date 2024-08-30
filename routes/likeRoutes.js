// routes/likeRoutes.js

import express from 'express';
import { toggleLike, getAllLikes } from '../controllers/likeController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to toggle like on a post
router.get('/toggle/:postId', authMiddleware, toggleLike);

// Route to get all likes for a specific post
router.get('/:postId', authMiddleware, getAllLikes);

export default router;
