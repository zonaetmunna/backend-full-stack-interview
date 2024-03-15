const User = require('../model/user.model');
const { sendResponse } = require('../utils/sendResponse');

const users = []; // Hardcoded data

// Create a user
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User(username, password);
    users.push(newUser);
    sendResponse(res, 201, 'User created successfully', newUser);
  } catch (error) {
    sendResponse(res, 500, 'Internal server error', error);
  }
};

// Read all users
exports.getAllUsers = (req, res) => {
  sendResponse(res, 200, 'All users', users);
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { password } = req.body;

    // Find the user by username
    const userToUpdate = users.find(user => user.username === username);

    // If user not found, return error
    if (!userToUpdate) {
      return sendResponse(res, 404, 'User not found');
    }

    // Update user's password
    userToUpdate.password = password;

    // Send response with updated user
    sendResponse(res, 200, 'User updated successfully', userToUpdate);
  } catch (error) {
    sendResponse(res, 500, 'Internal server error', error);
  }
};

// Delete a user by username
exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the index of the user in the users array
    const userIndex = users.findIndex(user => user.username === username);

    // If user not found, return error
    if (userIndex === -1) {
      return sendResponse(res, 404, 'User not found');
    }

    // Remove user from the users array
    const deletedUser = users.splice(userIndex, 1)[0];

    // Send response with deleted user
    sendResponse(res, 200, 'User deleted successfully', deletedUser);
  } catch (error) {
    sendResponse(res, 500, 'Internal server error', error);
  }
};
