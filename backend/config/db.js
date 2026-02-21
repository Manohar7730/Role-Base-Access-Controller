import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/RBAC";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB successfully connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;
