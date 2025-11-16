// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Post = require('./models/Post');

// 1. Load .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 2. Get MongoDB URI from .env
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('MONGO_URI is not defined in your .env file!');
    process.exit(1); // Exit the app if the URI is missing
}

// --- Basic Express Setup ---
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Mongoose API!');
});
// ---------------------------

// --- CRUD Routes ---

// CREATE a new user
// This route will handle POST requests to /users
app.post('/users', async (req, res) => {
    try {
        // req.body contains the JSON data from Postman
        // { "name": "Admin", "email": "admin@example.com" }

        // User.create() is a Mongoose command.
        // It takes the req.body and "applies" it to the User.js schema.
        // If the data is valid, it saves it to the database.
        const newUser = await User.create(req.body);

        // Send back a 201 (Created) status and the new user data
        res.status(201).json({
            message: "User created successfully!",
            data: newUser
        });

    } catch (error) {
        // This will catch errors, like if the 'email' is not unique
        res.status(400).json({
            message: "Error creating user",
            error: error.message
        });
    }
});
// -----------------

// READ all users
app.get('/users', async (req, res) => {
    try {
        // User.find({}) (with an empty object) finds all users
        const users = await User.find({});

        res.status(200).json({
            message: "Users retrieved successfully!",
            data: users
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users",
            error: error.message
        });
    }
});

// READ one user by ID
app.get('/users/:id', async (req, res) => {
    try {
        // Get the ID from the URL parameters
        const userId = req.params.id;

        // User.findById() is a helper for finding by the unique _id
        const user = await User.findById(userId);

        if (!user) {
            // If no user is found, send a 404
            return res.status(404).json({ message: "User not found" });
        }

        // User was found, send it back
        res.status(200).json({
            message: "User found!",
            data: user
        });

    } catch (error) {
        // This catches errors like an invalid ID format
        res.status(500).json({
            message: "Error retrieving user",
            error: error.message
        });
    }
});

// UPDATE a user by ID
app.patch('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body; // This is { "age": 31 } or { "name": "New Name" }

        // Find by ID and update
        // { new: true } tells Mongoose to send back the *new*, updated document
        // { runValidators: true } tells Mongoose to run the rules from your schema (like 'required')
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { 
            new: true, 
            runValidators: true 
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully!",
            data: updatedUser
        });

    } catch (error) {
        res.status(400).json({
            message: "Error updating user",
            error: error.message
        });
    }
});

// DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send back a "204 No Content" on success, or just a success message
        res.status(200).json({
            message: "User deleted successfully!",
            data: deletedUser // You can send back the user that was deleted
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
});

// CREATE a new post for a user
app.post('/posts', async (req, res) => {
    try {
        // Get Alice's ID (we'll hard-code it for this test)
        // In a real app, this would come from req.user (from auth)
        // You can also get this from your 'GET /users' response
        const aliceId = "6919af660fc10450c678d434"; // <-- PASTE YOUR ALICE's ID HERE

        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: aliceId // We link the post to Alice
        });

        res.status(201).json({
            message: "Post created successfully!",
            data: newPost
        });

    } catch (error) {
        res.status(400).json({
            message: "Error creating post",
            error: error.message
        });
    }
});

// READ all posts (and populate the author's details)
app.get('/posts', async (req, res) => {
    try {
        // 1. Find all posts
        // 2. .populate('author') tells Mongoose to "swap" the author ID
        //    with the full User document.
        // 3. We can even select *which* fields to get: 'name email'
        const posts = await Post.find({}).populate('author', 'name email');

        res.status(200).json({
            message: "Posts retrieved successfully!",
            data: posts
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving posts",
            error: error.message
        });
    }
});

app.get('/users/:id/posts', async (req, res) => {
    try {
        // Get the ID from the URL parameters
        const userId = req.params.id;

        // User.findById() is a helper for finding by the unique _id
        const postsId = await Post.find({ author: userId });

        if (!postsId) {
            // If no user is found, send a 404
            return res.status(404).json({ message: "No post for this user" });
        }

        // User was found, send it back
        res.status(200).json({
            message: "Post found!",
            data: postsId
        });

    } catch (error) {
        // This catches errors like an invalid ID format
        res.status(500).json({
            message: "Error retrieving post",
            error: error.message
        });
    }
});

// 3. Connect to MongoDB using Mongoose
// We put this in a function to use async/await
const connectDB = async () => {
    try {
        // Mongoose.connect returns a promise
        await mongoose.connect(mongoUri);

        console.log('✅ MongoDB connected successfully!');

        // Start the Express server *only after* a successful DB connection
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });

    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Exit the app on a connection failure
    }
};

// 4. Call the function to start the connection
connectDB();