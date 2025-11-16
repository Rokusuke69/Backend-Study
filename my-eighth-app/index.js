// index.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// --- API v1 Routes ---

// 1. Create a router for all v1 routes
const v1Router = express.Router();

// --- Validation Rules ---
const userValidationRules = [
    // 1. 'email' must be a valid email and is required
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email address'),

    // 2. 'password' must be at least 6 chars long
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // 3. 'username' must not be empty
    check('username')
        .notEmpty().withMessage('Username is required')
        .trim() // Removes whitespace
        .escape() // Converts HTML chars like <, > to safe ones (&lt;, &gt;)
];
// ------------------------

// 2. Add some routes to the router
v1Router.get('/', (req, res) => {
    res.send('Hello from API v1!');
});

v1Router.get('/hello', (req, res) => {
    res.send('This is the v1 hello endpoint.');
});

// --- Middleware to handle validation results ---
const validate = (req, res, next) => {
    // 1. Get the validation results
    const errors = validationResult(req);

    // 2. Check if there are any errors
    if (!errors.isEmpty()) {
        // If yes, send a 400 status and the error messages
        return res.status(400).json({ errors: errors.array() });
    }

    // 3. If no errors, call next() to move to the route handler
    next();
};

// --- Create User Route (Protected) ---
// We add our middlewares in order:
// 1. The validation rules run
// 2. Our 'validate' handler runs to check for errors
// 3. If it passes, our main (req, res) logic runs
v1Router.post('/users', userValidationRules, validate, (req, res) => {

    // If the code reaches here, the data is valid and sanitized!
    const validUserData = req.body;

    res.status(201).json({
        message: "User created successfully!",
        user: validUserData
    });
});

// 3. Mount the v1 router in the main app
// All routes in v1Router will now be prefixed with /api/v1
app.use('/api/v1', v1Router);
// ------------------------

// --- Server Start ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});