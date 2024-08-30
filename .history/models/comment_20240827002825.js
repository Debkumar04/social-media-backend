// In-memory storage for comments
let comments = [];
let nextId = 1;

/**
 * Create a new comment
 * @param {Object} commentData - The data for the new comment
 * @returns {Object} - The created comment
 */
const createComment = (commentData) => {
  const newComment = {
    id: nextId++,
    ...commentData,
  };
  comments.push(newComment);
  return newComment;
};

/**
 * Get all comments for a specific post
 * @param {number} postId - The ID of the post
 * @returns {Array} - An array of comments for the specified post
 */
const getCommentsByPostId = (postId) => {
  return comments.filter(comment => comment.postId === postId);
};

/**
 * Get a specific comment by its ID
 * @param {number} id - The ID of the comment
 * @returns {Object} - The comment with the specified ID
 */
const getCommentById = (id) => {
  return comments.find(comment => comment.id === id);
};

/**
 * Update a comment by its ID
 * @param {number} id - The ID of the comment
 * @param {Object} updateData - The data to update
 * @param {number} userId - The ID of the user making the request
 * @returns {Object} - The updated comment or null if not found or not authorized
 */
const updateCommentById = (id, updateData, userId) => {
  const index = comments.findIndex(comment => comment.id === id);
  if (index === -1 || comments[index].userId !== userId) return null;
  comments[index] = { ...comments[index], ...updateData };
  return comments[index];
};

/**
 * Delete a comment by its ID
 * @param {number} id - The ID of the comment
 * @param {number} userId - The ID of the user making the request
 * @returns {boolean} - Whether the comment was deleted successfully
 */
const deleteCommentById = (id, userId) => {
  const index = comments.findIndex(comment => comment.id === id);
  if (index === -1 || comments[index].userId !== userId) return false;
  comments.splice(index, 1);
  return true;
};

export { createComment, getCommentsByPostId, getCommentById, updateCommentById, deleteCommentById };
