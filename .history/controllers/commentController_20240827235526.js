// ./controllers/commentController.js

import { createComment, getCommentsByPostId, getCommentById, updateCommentById, deleteCommentById } from '../models/comment.js';
import { AppError } from '../middlewares/errorHandler.js';

/**
 * Create a new comment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const addComment = (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.userId; // Assuming userId is set in req by authMiddleware

    // Create the new comment
    const newComment = createComment({
      postId,
      userId,
      content,
      createdAt: new Date(),
    });

    res.status(201).json({
      status: 'success',
      data: {
        comment: newComment,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all comments for a specific post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAllComments = (req, res, next) => {
  try {
    const { postId } = req.params;

    // Get comments for the specified post
    const comments = getCommentsByPostId(postId);
    if (!comments.length) {
      return next(new AppError('No comments found for this post', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        comments,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get a specific comment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getComment = (req, res, next) => {
  try {
    const { commentId } = req.params;

    // Get the comment by ID
    const comment = getCommentById(Number(commentId));
    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update a comment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const updateComment = (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.userId; // Assuming userId is set in req by authMiddleware

    // Update the comment
    const updatedComment = updateCommentById(Number(commentId), { content }, userId);
    if (!updatedComment) {
      return next(new AppError('Comment not found or not authorized to update', 403));
    }

    res.status(200).json({
      status: 'success',
      data: {
        comment: updatedComment,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a comment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const deleteComment = (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.userId; // Assuming userId is set in req by authMiddleware

    // Delete the comment
    const success = deleteCommentById(Number(commentId), userId);
    if (!success) {
      return next(new AppError('Comment not found or not authorized to delete', 403));
    }

    res.status(200).json({
      status: 'success',
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export { addComment, getAllComments, getComment, updateComment, deleteComment };
