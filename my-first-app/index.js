// index.js

const http = require('http');
const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {

    // This is the router
    if (req.url === '/') {
        // Home Page
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to the Home Page!');

    } else if (req.url === '/about') {
        // About Page
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('This is the About Page.');

    }else if (req.url === '/json') {

        // JSON Response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('{"message": "This is JSON data"}')

    } else {
        // 404 Not Found
        res.statusCode = 404; // <-- Notice the new status code
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 - Page Not Found');
    }
});

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}/`);
});