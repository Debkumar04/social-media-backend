// ./controllers/likeController.js

import { addLike, removeLike, getLikesByPostId, getLike } from '../models/like.js';
import { AppError } from '../middlewares/errorHandler.js';

/**
 * Toggle like on a post by a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const toggleLike = (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.userId; // Assuming userId is set in req by authMiddleware

    // Check if the like already exists
    const existingLike = getLike(userId, postId);
    if (existingLike) {
      // If the like exists, remove it (unlike)
      removeLike(userId, postId);
      return res.status(200).json({ status: 'success', message: 'Post unliked' });
    } else {
      // If the like doesn't exist, add it (like)
      addLike(userId, postId);
      return res.status(200).json({ status: 'success', message: 'Post liked' });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Get all likes for a specific post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAllLikes = (req, res, next) => {
  try {
    const { postId } = req.params;

    // Get all likes for the specified post
    const likes = getLikesByPostId(postId);
    if (likes.length === 0) {
      return next(new AppError('No likes found for this post', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        likes,
      },
    });
  } catch (err) {
    next(err);
  }
};

export { toggleLike, getAllLikes };
