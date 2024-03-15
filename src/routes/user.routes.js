// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Create a user
router.post('/users', userController.createUser);

// Read all users
router.get('/users', userController.getAllUsers);

// Update a user
router.patch('/users/:username', userController.updateUser);

// Delete a user
router.delete('/users/:username', userController.deleteUser);

module.exports = router;
