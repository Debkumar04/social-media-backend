import express from 'express';
import { createNewPost, getAllUserPosts, getPost, updateExistingPost, deletePostById } from '../controllers/postController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/fileUpload.js'; // Import the upload middleware

const router = express.Router();

// Apply authentication middleware to all routes
router.use(au);

// Routes
router.post('/posts', upload.single('image'), createNewPost); // Create a new post with image upload
router.get('/posts', getAllUserPosts); // Get all posts
router.get('/posts/:postId', getPost); // Get a specific post by ID
router.put('/posts/:postId', upload.single('image'), updateExistingPost); // Update a post by ID with image upload
router.delete('/posts/:postId', deletePostById); // Delete a post by ID

export default router;
