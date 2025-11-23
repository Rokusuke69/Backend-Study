// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// 1. Define a simple User Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    email: String
});
// Note: We are NOT adding indexes yet!

const User = mongoose.model('User', userSchema);

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to DB. Seeding data... (This may take a moment)');

        // Delete existing data so we start fresh
        await User.deleteMany({});

        const users = [];
        const cities = ['Mumbai', 'Delhi', 'Bangalore', 'New York', 'London'];

        // 2. Generate 5,000 fake users
        for (let i = 0; i < 5000; i++) {
            users.push({
                name: `User${i}`,
                age: Math.floor(Math.random() * 60) + 18, // Random age 18-78
                city: cities[Math.floor(Math.random() * cities.length)], // Random city
                email: `user${i}@example.com`
            });
        }

        // 3. Insert them all at once
        await User.insertMany(users);
        console.log('✅ 5,000 Users inserted!');
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();