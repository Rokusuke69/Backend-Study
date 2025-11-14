const express = require('express');
const multer = require('multer');
const path = require('path'); // Node's built-in 'path' module

const app = express();
const port = 3000;

// --- Multer Configuration ---

// 1. Configure Disk Storage
// This tells Multer *where* and *how* to save the files.
const storage = multer.diskStorage({
    // destination: 'uploads/' (A folder in our project)
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // filename: Create a unique filename
    filename: (req, file, cb) => {
        // file.originalname is the 'my-cat-photo.jpg'
        // Date.now() is a unique timestamp
        // path.extname() gets the '.jpg'
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. Initialize Multer
// We pass our storage configuration to it.
const upload = multer({ storage: storage });
// 'upload' is now our middleware!
// ---------------------------------

// --- Middleware ---
// Serve our static index.html file
app.use(express.static('public'));
// ------------------

// --- Routes ---

// This is the route our form 'action' points to.
// We add the Multer middleware: upload.single('myFile')
// 'upload.single()' means "I expect 1 file, and its 'name' in the form is 'myFile'"
app.post('/upload', upload.single('myFile'), (req, res) => {

    // If Multer works, the file info is in 'req.file'
    // Any text fields from the form would be in 'req.body'

    console.log('File received:', req.file);

    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    // Send a success response
    res.json({
        message: 'File uploaded successfully!',
        filename: req.file.filename
    });
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});