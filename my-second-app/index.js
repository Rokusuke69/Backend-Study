// index.js

// 1. Import Express
const express = require('express');

// 2. Create the Express app
const app = express();
const port = 3000;

// 3. Define a "GET" route for the root URL ("/")
// This replaces our old "if (req.url === '/')"
app.get('/', (req, res) => {
    // 'res.send()' is a simple Express helper
    // It automatically sets 'Content-Type' to 'text/html'
    // and 'statusCode' to 200.
    res.send('Namaste Duniya! Welcome to my first *Express* server!');
});

// 4. Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});