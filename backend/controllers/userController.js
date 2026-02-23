import mongoose from "mongoose";
import Role from "../models/Role.js";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").populate("role");
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
