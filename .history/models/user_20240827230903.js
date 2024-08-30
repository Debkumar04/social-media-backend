// model/

import { v4 as uuidv4 } from 'uuid'; // For generating unique user IDs

// In-memory storage for users
const users = new Map(); // Use a Map to store users with their IDs as keys

/**
 * Create a new user
 * @param {Object} userData - The user data to store
 * @returns {Object} - The created user
 */
const createUser = (userData) => {
  const id = uuidv4(); // Generate a unique ID for the user
  const newUser = { id, ...userData };
  users.set(id, newUser);
  return newUser;
};

/**
 * Get a user by ID
 * @param {string} userId - The ID of the user to retrieve
 * @returns {Object} - The user object or null if not found
 */
const getUserById = (userId) => {
  return users.get(userId) || null;
};

/**
 * Get a user by email
 * @param {string} email - The email of the user to retrieve
 * @returns {Object} - The user object or null if not found
 */
const getUserByEmail = (email) => {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
};

/**
 * Update user details
 * @param {string} userId - The ID of the user to update
 * @param {Object} updateData - The data to update
 * @returns {Object} - The updated user object or null if not found
 */
const updateUser = (userId, updateData) => {
  const user = users.get(userId);
  if (!user) return null;
  const updatedUser = { ...user, ...updateData };
  users.set(userId, updatedUser);
  return updatedUser;
};

/**
 * Delete a user
 * @param {string} userId - The ID of the user to delete
 * @returns {boolean} - True if the user was deleted, false otherwise
 */
const deleteUser = (userId) => {
  return users.delete(userId);
};

export { createUser, getUserById, getUserByEmail, updateUser, deleteUser };
