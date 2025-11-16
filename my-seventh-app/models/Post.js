// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },

    // --- This is the Relationship ---
    author: {
        type: mongoose.Schema.Types.ObjectId, // A special datatype for IDs
        ref: 'User', // Tells Mongoose this ID refers to the 'User' model
        required: true
    }
    // ---------------------------------
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;