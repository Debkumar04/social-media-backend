// ./controllers/commentController.js

import { createCommentComment, getCommentsByPostId, updateComment, deleteComment } from '../models/comment.js';
import { AppError } from '../middlewares/errorHandler.js';

/**
 * Add a new comment to a post
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const addNewComment = (req, res, next) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.userId; // Assuming userId is set in authMiddleware

    if (!content) {
      throw new AppError('Comment content cannot be empty', 400);
    }

    const newComment = addComment(userId, postId, content);

    res.status(201).json({
      status: 'success',
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all comments for a specific post
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const getComments = (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = getCommentsByPostId(postId);

    res.status(200).json({
      status: 'success',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a comment
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const modifyComment = (req, res, next) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;
    const userId = req.userId; // Assuming userId is set in authMiddleware

    if (!content) {
      throw new AppError('Comment content cannot be empty', 400);
    }

    const updatedComment = updateComment(commentId, userId, content);

    if (!updatedComment) {
      throw new AppError('Comment not found or not authorized', 404);
    }

    res.status(200).json({
      status: 'success',
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a comment
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const removeComment = (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.userId; // Assuming userId is set in authMiddleware

    const isDeleted = deleteComment(commentId, userId);

    if (!isDeleted) {
      throw new AppError('Comment not found or not authorized', 404);
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export { addNewComment, getComments, modifyComment, removeComment };
