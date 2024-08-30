// models/comment.js
let posts = [];
let nextId = 1;

/**
 * Create a new post
 * @param {string} userId - The ID of the user creating the post
 * @param {string} caption - The caption of the post
 * @param {string} imageUrl - The URL of the post image
 * @returns {object} - The newly created post
 */
const createPost = (userId, caption, imageUrl) => {
  const post = {
    id: nextId++,
    userId,
    caption,
    imageUrl,
    createdAt: new Date(),
  };
  posts.push(post);
  return post;
};

/**
 * Get all posts
 * @returns {Array} - List of all posts
 */
const getAllPosts = () => {
  return posts;
};

/**
 * Get a specific post by its ID
 * @param {number} postId - The ID of the post
 * @returns {object|null} - The post if found, otherwise null
 */
const getPostById = (postId) => {
  return posts.find(post => post.id === postId) || null;
};

/**
 * Get all posts created by a specific user
 * @param {string} userId - The ID of the user
 * @returns {Array} - List of posts created by the user
 */
const getUserPosts = (userId) => {
  return posts.filter(post => post.userId === userId);
};

/**
 * Update a specific post by its ID
 * @param {number} postId - The ID of the post
 * @param {object} updates - The updates to apply
 * @returns {object|null} - The updated post if found, otherwise null
 */
const updatePost = (postId, updates) => {
  const index = posts.findIndex(post => post.id === postId);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    return posts[index];
  }
  return null;
};

/**
 * Delete a specific post by its ID
 * @param {number} postId - The ID of the post
 * @returns {boolean} - True if the post was deleted, otherwise false
 */
const deletePost = (postId) => {
  const initialLength = posts.length;
  posts = posts.filter(post => post.id !== postId);
  return posts.length < initialLength;
};

export { createPost, getAllPosts, getPostById, getUserPosts, updatePost, deletePost };
