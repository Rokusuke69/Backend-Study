// index.js
const express = require('express');
const morgan = require('morgan'); // 1. Import morgan
const logger = require('./logger'); // <-- 1. Import your new logger

const app = express();
const port = 3000;

// 2. Use the middleware
// 'dev' is the format. It defines WHAT info to log.
app.use(morgan('dev'));

// --- Routes ---
app.get('/', (req, res) => {
    // 2. Use the logger instead of console.log
    logger.info('Home page was visited!');
    res.send('Home Page');
});

app.get('/slow', (req, res) => {
    // Simulate a slow response (delay for 1 second)
    setTimeout(() => {
        res.send('Sorry I am late!');
    }, 1000);
});

app.get('/error', (req, res, next) => {
    // Create a real Javascript Error object
    const err = new Error('Database connection failed!');

    // Pass it to the error-handling middleware
    next(err); 
});

// Error Handling Middleware (Must be last!)
app.use((err, req, res, next) => {
    // 1. Log the error to our file
    // We use 'logger.error' instead of 'logger.info'
    logger.error({
        message: err.message,
        stack: err.stack // The stack trace tells us WHERE the error happened
    });

    // 2. Send response to user
    res.status(500).send('Something went wrong, but we logged it!');
});

app.listen(port, () => {
    // 3. Use the logger here too
    logger.info(`Server running on port ${port}`);
});