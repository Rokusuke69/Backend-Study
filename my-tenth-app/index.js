// index.js
const express = require('express');
const morgan = require('morgan'); // 1. Import morgan

const app = express();
const port = 3000;

// 2. Use the middleware
// 'dev' is the format. It defines WHAT info to log.
app.use(morgan('dev'));

// --- Routes ---
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/slow', (req, res) => {
    // Simulate a slow response (delay for 1 second)
    setTimeout(() => {
        res.send('Sorry I am late!');
    }, 1000);
});

app.get('/error', (req, res) => {
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});