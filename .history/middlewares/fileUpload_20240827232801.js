import express from 'express';
import { createNewPost, getAllUserPosts, getPost, updateExistingPost, deletePostById } from '../controllers/postController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up multer for file uploads
const upload = multer({
  dest: 'uploads/', // Directory for storing uploaded files
  fileFilter: (req, file, cb) => {
    // Filter to only accept image files
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Routes
router.use(authenticate); // Apply authentication middleware to all routes

router.post('/posts', upload.single('image'), createNewPost); // Create a new post
router.get('/posts', getAllUserPosts); // Get all posts
router.get('/posts/:postId', getPost); // Get a specific post by ID
router.put('/posts/:postId', upload.single('image'), updateExistingPost); // Update a post by ID
router.delete('/posts/:postId', deletePostById); // Delete a post by ID

export default router;
