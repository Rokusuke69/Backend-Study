// models/User.js
const mongoose = require('mongoose');

// 1. Create the Schema (the "blueprint")
const userSchema = new mongoose.Schema({
    // 'name' field
    name: {
        type: String,
        required: [true, 'A user must have a name'], // A custom error message
        trim: true // Trims whitespace (e.g., "  admin " -> "admin")
    },

    // 'email' field
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true, // No two users can have the same email
        lowercase: true, // Converts email to lowercase
        trim: true
    },

    // 'age' field
    age: {
        type: Number,
        required: false // This field is optional
    }
}, {
    // Schema options
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

// 2. Create the Model (the "toolbox" or "clerk")
// Mongoose will automatically create a collection called 'users' (lowercase, plural)
// based on the string 'User'
const User = mongoose.model('User', userSchema);

// 3. Export the Model so we can use it in index.js
module.exports = User;