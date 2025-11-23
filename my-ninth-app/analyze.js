const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = new mongoose.Schema({ name: String, email: String, city: String });
const User = mongoose.model('User', userSchema);

const runAnalysis = async () => {
    console.log("🔍 Searching for 'User4999'...");

    const result = await User.find({ name: 'User4999' }).explain('executionStats');
    const stats = result.executionStats;

    console.log("---------------------------------------------");
    console.log(`⏱️  Execution Time: ${stats.executionTimeMillis} ms`);
    console.log(`📄 Total Docs Examined: ${stats.totalDocsExamined}`);
    console.log(`🛑 Number of Results: ${stats.nReturned}`);
    console.log("---------------------------------------------");

    process.exit();
};

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        console.log("⚙️ Building index...");
        await User.collection.createIndex({ name: 1 });
        console.log("✅ Index built!");

        await runAnalysis();
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
})();

