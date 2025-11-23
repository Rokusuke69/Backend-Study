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
        { $match: { age: { $gt: 20 } } },

        // Stage 2: $group
        { 
            $group: {
                _id: "$city",
                totalUsers: { $sum: 1 },
                avgAge: { $avg: "$age" }
            }
        },

        // Stage 3: $sort
        { $sort: { totalUsers: -1 } },

        // Stage 4: $project
        {
            $project: {
                _id: 0,                // hide _id
                cityName: "$_id",      // rename _id → cityName
                totalUsers: 1,         // keep totalUsers
                averageAge: "$avgAge"  // rename avgAge → averageAge
            }
        }
    ]);

    console.log(stats);
    process.exit();
};

runAggregation();

