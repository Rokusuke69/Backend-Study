// aggregate.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = new mongoose.Schema({ name: String, age: Number, city: String, email: String });
const User = mongoose.model('User', userSchema);

const runAggregation = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected. Running Aggregation...");

    const stats = await User.aggregate([
        // Stage 1: $match
        // Filter: We only want users older than 20
        {
            $match: { age: { $gt: 20 } }
        },

        // Stage 2: $group
        // Group by 'city'.
        // Calculate 'totalUsers' by adding 1 for each person.
        // Calculate 'avgAge' by averaging the 'age' field.
        {
            $group: {
                _id: "$city", // The field we group by
                totalUsers: { $sum: 1 },
                avgAge: { $avg: "$age" }
            }
        },

        // Stage 3: $sort
        // Sort by 'totalUsers' in descending order (-1)
        {
            $sort: { totalUsers: -1 }
        }
    ]);

    console.log(stats);
    process.exit();
};

runAggregation();