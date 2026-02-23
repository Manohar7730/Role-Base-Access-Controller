import Role from "../models/Role.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userRole = await Role.findOne({ name: "USER" });

    if (!userRole) {
      return res.status(500).json({
        message: "USER role not found. Create role first.",
      });
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
    return res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exists" });
    }
    const checkPassword = await existingUser.comparePassword(password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    if (existingUser.status !== "ACTIVE") {
      return res.status(401).json({
        message: "Your account is not active",
      });
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
    return res.status(500).json({ error: "Server error" });
  }
};
