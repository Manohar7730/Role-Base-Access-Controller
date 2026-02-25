import passwordValidate from "../../passwordValidate.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    const userRole = await Role.findOne({ name: "USER" });

    if (!userRole) {
      return next(new AppError("USER role not found. Create role first.", 500));
    }

    if (!passwordValidate(password)) {
      return next(
        new AppError(
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
          400,
        ),
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      status: "PENDING",
      role: userRole._id,
    });

    return res.status(201).json({
      message: "User created",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    if (!existingUser) {
      return next(new AppError("User does not exists", 400));
    }

    if (!passwordValidate(password)) {
      return next(
        new AppError(
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
          400,
        ),
      );
    }

    const checkPassword = await existingUser.comparePassword(password);

    if (!checkPassword) {
      return next(new AppError("Invalid Credentials", 401));
    }

    if (existingUser.status !== "ACTIVE") {
      return next(new AppError("Your account is not active", 401));
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Logged in Successfully",
      token,
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};
