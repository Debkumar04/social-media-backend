// ./routes/commentRoutes.js

import express from 'express';
import { addComment, getAllComments, getComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Route to create a new comment
router.post('/posts/:postId/comments', addComment);

// Route to get all comments for a specific post
router.get('/posts/:postId/comments', getAllComments);

// Route to get a specific comment by ID
router.get('/comments/:commentId', getComment);

// Route to update a comment by ID
router.put('/comments/:commentId', updateComment);

// Route to delete a comment by ID
router.delete('/comments/:commentId', deleteComment);

export default router;
