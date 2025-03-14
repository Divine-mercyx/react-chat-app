const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Connection FAIL: ${err.message}`);
        console.error("Possible Reasons: MongoDB is not running, wrong URI, firewall issues.");
        process.exit(1);
    }
};

module.exports = connectDB;