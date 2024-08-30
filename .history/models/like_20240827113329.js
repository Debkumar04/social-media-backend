// ./model/like.js

const likes = []; // Array to store likes

/**
 * Add a like to a post by a user
 * @param {string} userId - The ID of the user who liked the post
 * @param {string} postId - The ID of the post to like
 * @returns {Object} - The created like object
 */
const addLike = (userId, postId) => {
  const like = { id: `${userId}-${postId}`, userId, postId };
  likes.push(like);
  return like;
};

/**
 * Remove a like from a post by a user
 * @param {string} userId - The ID of the user who wants to remove their like
 * @param {string} postId - The ID of the post to unlike
 * @returns {boolean} - True if the like was removed, false otherwise
 */
const removeLike = (userId, postId) => {
  const index = likes.findIndex(like => like.userId === userId && like.postId === postId);
  if (index !== -1) {
    likes.splice(index, 1);
    return true;
  }
  return false;
};

/**
 * Get all likes for a specific post
 * @param {string} postId - The ID of the post to get likes for
 * @returns {Array} - Array of likes for the specified post
 */
const getLikesByPostId = (postId) => {
  return likes.filter(like => like.postId === postId);
};

/**
 * Get a like by userId and postId
 * @param {string} userId - The ID of the user
 * @param {string} postId - The ID of the post
 * @returns {Object|null} - The like object or null if not found
 */
const getLike = (userId, postId) => {
  return likes.find(like => like.userId === userId && like.postId === postId) || null;
};

export { addLike, removeLike, getLikesByPostId, getLike };
