// src/utils/asyncHandler.js

// This function wraps your async route handlers.
// If an error happens, it catches it and calls next(error).
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
