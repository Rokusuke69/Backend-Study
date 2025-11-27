// src/controllers/homeController.js
const asyncHandler = require('../utils/asyncHandler');

// Just a simple logic function
// Notice: NO try-catch block needed! The wrapper handles it.
const getHome = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the structured API!',
    timestamp: new Date(),
  });
});

const getError = asyncHandler(async (req, res) => {
  // We intentionally throw an error to test the wrapper
  throw new Error('This is a simulated crash!');
});

module.exports = { getHome, getError };
