// routes/postRoutes.js

import express from 'express';
import { createPost, getPost, updatePost, deletePost, getAllPosts } from '../controllers/postController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { fileUpload } from '../middlewares/fileUpload.js';

const router = express.Router();

// Route to create a new post (with file upload middleware for images)
router.post('/', authMiddleware, fileUpload.single('image'), createPost);

// Route to get a specific post by its ID
router.get('/:postId', authMiddleware, getPost);

// Route to update a specific post by its ID
router.patch('/:postId', authMiddleware, fileUpload.single('image'), updatePost);

// Route to delete a specific post by its ID
router.delete('/:postId', authMiddleware, deletePost);

// Route to get all posts
router.get('/', authMiddleware, getAllPosts);

export default router;
