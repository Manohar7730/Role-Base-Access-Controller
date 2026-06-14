import mongoose from "mongoose";
import { seedDatabase } from "../seed/seedDatabase.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/RBAC";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB successfully connected");
    await seedDatabase();
    console.log("Application started");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
