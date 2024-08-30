// In-memory data structure to store likes
let likes = [];

/**
 * Add a like to a post
 * @param {string} userId - The ID of the user liking the post
 * @param {string} postId - The ID of the post being liked
 * @returns {number} - Total number of likes on the post after adding the like
 */
const addLike = (userId, postId) => {
  // Check if the user has already liked the post
  const existingLike = likes.find(like => like.userId === userId && like.postId === postId);
  
  if (existingLike) {
    // If the user has already liked the post, return the total likes without adding a new one
    return getTotalLikes(postId);
  }
   
  // Add the new like
  const newLike = {
    id: `like_${likes.length + 1}`,
    userId,
    postId
  };
  likes.push(newLike);

  return getTotalLikes(postId);
};

/**
 * Remove a like from a post
 * @param {string} userId - The ID of the user removing the like
 * @param {string} postId - The ID of the post from which the like is being removed
 * @returns {number} - Total number of likes on the post after removing the like
 */
const removeLike = (userId, postId) => {
  const initialLength = likes.length;

  // Remove the like if it exists
  likes = likes.filter(like => !(like.userId === userId && like.postId === postId));

  // Return the total number of likes after removal
  return getTotalLikes(postId);
};

/**
 * Get the total number of likes for a specific post
 * @param {string} postId - The ID of the post for which to count likes
 * @returns {number} - The total number of likes
 */
const getTotalLikes = (postId) => {
  return likes.filter(like => like.postId === postId).length;
};

/**
 * Get all likes for a specific post
 * @param {string} postId - The ID of the post for which to retrieve likes
 * @returns {array} - Array of like objects
 */
const getLikesByPostId = (postId) => {
  return likes.filter(like => like.postId === postId);
};

export { addLike, removeLike, getLikesByPostId, getTotalLikes };
