// index.js
const express = require('express');

const helmet = require('helmet'); // Import
const cors = require('cors');     // Import
const app = express();
const port = 3000;

// --- Middleware ---
app.use(helmet()); // Secures your app with various headers
app.use(cors());   // Allows cross-origin requests
app.use(express.json()); // For parsing JSON bodies (add this now for later)

// --- Custom Middleware Function ---
const myLogger = (req, res, next) => {
    console.log(`[LOG] Request received: ${req.method} ${req.url} at ${new Date()}`);
    next(); // Pass control to the next middleware function
}

const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === 'supersecret') {
        next(); // Valid key, proceed
    } else {
        res.status(401).json({ error: 'Invalid API Key' }); // Unauthorized
    }
};


// --- Use the middleware ---
// This tells Express to use 'myLogger' on EVERY request.
// This MUST be placed BEFORE your routes.
app.use(myLogger);
// --------------------------

// --- Router-Level Middleware ---

// 1. Create a new router
const adminRouter = express.Router();

// 2. Create middleware for this router
const checkAdminAuth = (req, res, next) => {
    if (req.query.password === '1234') {
        next(); // Password is correct, proceed to the route
    } else {
        // Stop the chain and send an error
        res.status(403).send('Forbidden: You are not an Admin.');
    }
};

// 3. "Use" the middleware on the router
// This will run checkAdminAuth for ALL routes defined on adminRouter
adminRouter.use(checkAdminAuth);

// 4. Define routes for this router
adminRouter.get('/', (req, res) => {
    res.send('Welcome to the Admin Dashboard!');
});

adminRouter.get('/users', (req, res) => {
    res.send('Managing all users.');
});

// 5. Mount the router in your main app
// All routes in adminRouter will be prefixed with /admin
app.use('/admin', adminRouter);
// ---------------------------------

app.get('/broken', (req, res, next) => {
    // We create an error and pass it to next()
    const err = new Error('This route is intentionally broken!');
    err.status = 500;
    next(err); // This jumps directly to the error-handling middleware
});

app.get('/secret-data', checkApiKey, (req, res) => {
    res.json({ message: 'Access granted to secret data!' });
});

// --- Routes ---
app.get('/', (req, res) => {
    res.send('Hello from the homepage!');
});

app.get('/about', (req, res) => {
    res.send('This is the About page.');
});
// -----------------

// --- Error-Handling Middleware ---
// This MUST have 4 arguments to be recognized as an error handler.
// It MUST be the LAST 'app.use()' in your file.
app.use((err, req, res, next) => {

    console.error(err.stack); // Log the full error to the terminal

    // Send a clean JSON response to the client
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Something went wrong!'
        }
    });
});
// ---------------------------------

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});