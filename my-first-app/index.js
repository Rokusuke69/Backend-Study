//index.js

// 1. import the 'http' module
const http = require('http');

// 2. Define the host and port

const host = 'localhost'; // This means your own computer
const port = 3000; // A common port for development

// 3. Create the server
// This function runs every single time a request hits your server
const server = http.createServer((req, res) => {

    // req = The request object (What the client sent to the server)
    // res = The response object (What the server sends back to the client)

    // 4. Send the response

    // set the status code (200 means OK)
    res.statusCode = 200;

    // set the header (tells the client what *kind* of data we are sending)
    res.setHeader('Content-Type', 'text/plain');

    // set the body (the actual content we are sending) and end the response
    res.end('Namaste Duniya! Welcome to my first server\n');
});

// 5. Start the server
// It will now "listen" for requests on the specified host and port
server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}/`);
    console.log('Press Ctrl+C to stop the server.');
});