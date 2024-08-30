// routes/commentRoutes.js

import express from 'express';
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new comment on a specific post
router.post('/:postId', protect, createComment);

// Route to get all comments for a specific post
router.get('/:postId', protect, getCommentsByPostId);

// Route to update a comment by ID
router.put('/:commentId', protect, updateComment);

// Route to delete a comment by ID
router.delete('/:commentId', protect, deleteComment);

export default router;
