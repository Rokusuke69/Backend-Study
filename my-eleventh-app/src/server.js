// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const homeRoutes = require('./routes/homeRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', homeRoutes);

// Global Error Handler (Required for asyncHandler to work)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`🚀 Production-ready server running on port ${port}`);
});
