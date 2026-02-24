import mongoose from "mongoose";
import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .populate("role")
      .then((list) => list.filter((u) => u.role.name !== "SUPER_ADMIN"));
    return res.status(200).json({ message: "Users fetched", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatus = ["PENDING", "ACTIVE"];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    ).populate("role");
    return res.status(202).json({ message: "User status updated", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignRoleToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const roleDoc = await Role.findOne({ name: role });
    if (!roleDoc) {
      return res.status(404).json({ message: "Role not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { role: roleDoc._id },
      { returnDocument: "after" },
    ).populate("role");
    return res.status(202).json({ message: "User role updated", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const adminResetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res
        .status(400)
        .json({ message: "Password required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword; 
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};