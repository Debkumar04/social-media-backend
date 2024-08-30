import express from 'express';
import { createNewPost, getAllUserPosts, getPost, updateExistingPost, deletePostById } from '../controllers/postController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/fileUpload.js'; // Import the upload middleware

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Routes
router.post('/post', upload.single('image'), createNewPost); // Create a new post with image upload
router.get('/', getAllUserPosts); // Get all posts
router.get('/post/:postId', getPost); // Get a specific post by ID
router.put('/post/:postId', upload.single('image'), updateExistingPost); // Update a post by ID with image upload
router.delete('/post/:postId', deletePostById); // Delete a post by ID

export default router;
