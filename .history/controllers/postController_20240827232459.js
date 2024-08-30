import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../models/post.js';
import { AppError } from '../middlewares/errorHandler.js';

/**
 * Create a new post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const createNewPost = (req, res, next) => {
  try {
    const { caption } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Handle image upload

    if (!caption) {
      return next(new AppError('Caption is required', 400));
    }

    const userId = req.userId; // Assume userId is set in req by authMiddleware
    const newPost = createPost(userId, caption, imageUrl);

    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all posts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAllUserPosts = (req, res, next) => {
  try {
    const posts = getAllPosts();
    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get a specific post by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getPost = (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = getPostById(Number(postId));

    if (!post) {
      return next(new AppError('Post not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update a specific post by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const updateExistingPost = (req, res, next) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Handle image upload

    if (!caption && !imageUrl) {
      return next(new AppError('No update data provided', 400));
    }

    const updatedPost = updatePost(Number(postId), { caption, imageUrl });

    if (!updatedPost) {
      return next(new AppError('Post not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post: updatedPost,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a specific post by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const deletePostById = (req, res, next) => {
  try {
    const { postId } = req.params;
    const success = deletePost(Number(postId));

    if (!success) {
      return next(new AppError('Post not found', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export { createNewPost, getAllUserPosts, getPost, updateExistingPost, deletePostById };
