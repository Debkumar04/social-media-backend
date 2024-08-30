// ./controllers/postController.js

import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createPost as createPostModel, getAllPosts as getAllPostsModel, getPostById as getPostByIdModel, updatePostById as updatePostByIdModel, dele as deletePostByIdModel } from '../models/post.js';
import { AppError } from '../middlewares/errorHandler.js'; // Import AppError

/**
 * Create a new post
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createPost = (req, res, next) => {
  const { caption } = req.body;
  let imageUrl = null;

  // Check if a file was uploaded
  if (req.file) {
    // Generate the URL for the uploaded image
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  if (!imageUrl) {
    // If imageUrl is null, return an error
    return next(new AppError('Image file is required', 400));
  }

  // Create a new post with the image URL
  const newPost = createPostModel({ caption, imageUrl });

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost
    }
  });
};

/**
 * Get all posts
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getAllPosts = (req, res) => {
  const posts = getAllPostsModel();
  res.status(200).json({
    status: 'success',
    data: {
      posts
    }
  });
};

/**
 * Get a specific post by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getPostById = (req, res) => {
  const { id } = req.params;
  const post = getPostByIdModel(id);

  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
  });
};

/**
 * Update a specific post by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const updatePostById = (req, res, next) => {
  const { id } = req.params;
  const { caption } = req.body;
  let imageUrl = null;

  // Check if a new file was uploaded
  if (req.file) {
    // Generate the URL for the new uploaded image
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  if (!imageUrl) {
    // If imageUrl is null, return an error
    return next(new AppError('Image file is required', 400));
  }

  const updatedPost = updatePostByIdModel(id, { caption, imageUrl });

  if (!updatedPost) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      post: updatedPost
    }
  });
};

/**
 * Delete a post by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const deletePostById = (req, res) => {
  const { id } = req.params;
  const success = deletePostByIdModel(id);

  if (!success) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

export { createPost, getAllPosts, getPostById, updatePostById, deletePostById };
