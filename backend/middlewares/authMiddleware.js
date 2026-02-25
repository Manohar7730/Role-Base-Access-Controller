import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("No token provided", 401));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new AppError("Malformed authorization header", 401));
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedUser.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (user.status !== "ACTIVE") {
      return next(new AppError("Account inactive", 401));
    }

    req.userId = user._id;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

export default authMiddleware;