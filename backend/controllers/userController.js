import mongoose from "mongoose";
import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import passwordValidate from "../../passwordValidate.js";
import AppError from "../utils/AppError.js";
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").populate("role");

    const filteredUsers = users.filter((u) => u.role?.name !== "SUPER_ADMIN");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: filteredUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["PENDING", "ACTIVE"];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid ID", 400));
    }

    if (!allowedStatus.includes(status)) {
      return next(new AppError("Invalid status value", 400));
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    ).populate("role");

    return res.status(202).json({ message: "User status updated", data: user });
  } catch (error) {
    next(error);
  }
};

export const assignRoleToUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const roleDoc = await Role.findOne({ name: role });

    if (!roleDoc) {
      return next(new AppError("Role not found", 404));
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid ID", 400));
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role: roleDoc._id },
      { returnDocument: "after" },
    ).populate("role");

    return res.status(202).json({ message: "User role updated", data: user });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(new AppError("All fields are required", 400));
    }

    if (!passwordValidate(newPassword)) {
      return next(
        new AppError(
          "New Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
          400,
        ),
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return next(new AppError("Current password is incorrect", 400));
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const adminResetPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return next(new AppError("Password required", 400));
    }

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};
