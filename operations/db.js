const mongoose = require("mongoose");
const {MONGODB_URI} = require("../config/envConfig");

mongoose.set("strictQuery", false);

const connectDB = async (app) => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB successfully");
    } catch (error) {
        console.error("Error connecting to DB:", error);
        process.exit(1);
    }
}

module.exports = connectDB;