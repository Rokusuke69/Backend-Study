const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

const port = 3000;

// --- Middleware ---
// This line "teaches" Express to read JSON bodies.
// It *must* be before your route handlers.
app.use(express.json());

// This is the new line:
// It serves all files from the 'public' folder.
app.use(express.static('public'));

// --- Routes ---
// 1. GET / (Home)
// app.get('/', (ree, res) => {
//     res.send('Welcome to the User API!');
// });

// index.js

// This route will "render" the EJS file
// app.get('/', (req, res) => {

//     // res.render() is the new command.
//     // 1. It looks inside the 'views' folder.
//     // 2. It finds 'index.ejs'. (You don't need to type .ejs)
//     // 3. It "renders" it as HTML.

//     // The 2nd argument is the "data" object (locals)
//     res.render('index', { 
//         username: "Admin" 
//     });
// });

app.get('/users', (req, res) => {
    // A "fake" list of users from a database
    const userList = [
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
        { name: "Charlie", email: "charlie@example.com" }
    ];

    res.render('users', {
        users: userList
    });
});

app.get('/contact', (req, res) => {
    const contactInfo = {
  pageTitle: "Contact Us",
  contactInfo: {
    phone: "123-456-7890",
    email: "info@myserver.com"
  }};
    res.render('contact', {
        contact: contactInfo
    });
})

// 2. GET /search (Query Parameters: req.query)
// Test with: http://localhost:3000/search?city=Mumbai
app.get('/search', (req, res) => {
    const city = req.query.city;
    if(!city) {
        return res.send('Please provide a city in the query.');
    }
    res.send(`Searching for results in ${city}...`);
});


// 3. GET /users/:id (Route Parameters: req.params)
// Test with: http://localhost:3000/users/42
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    // In a real app, you'd fetch user "42" from the database.
    res.json({
        message: "Fetching user data",
        userId: userId
    });
});

// 4. POST /login (Request Body: req.body)
// Test with POSTMAN:
//   - Set method to POST
//   - Set URL to http://localhost:3000/login
//   - Go to "Body" tab -> "raw" -> "JSON"
//   - Type this in the body: { "username": "admin", "password": "123" }
app.post('/login', (req, res) => {
    // Thanks to 'express.json()', req.body is a real JS object
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'admin' && password === '123') {
        res.status(200).json({
            message: "Login Successful",
            token: "fake-jwt-token-12345"
        });
    } else {
        // You can chain status() and json()!
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// 5. DELETE /users/:id (req.params)
// Test with POSTMAN:
//   - Set method to DELETE
//   - Set URL to http://localhost:3000/users/42
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // In a real app, you'd delete user "42" from the database.
    res.send(`User ${userId} has been deleted.`);
});

// 6. PUT /users/:id (req.params + req.body)
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const newData = req.body;

    // In a real app, you'd update user "42" in the database.
    res.json({
        message: `User ${userId} has been updated.`,
        newData: req.body
    });
})


// --- Start Server ---
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});