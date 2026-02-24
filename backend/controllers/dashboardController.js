import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments({
      "role.name": { $ne: "SUPER_ADMIN" },
    });

    const activeUsers = await User.countDocuments({
      status: "ACTIVE",
    });

    const pendingUsers = await User.countDocuments({
      status: "PENDING",
    });

    const roles = await Role.countDocuments({
      name: { $ne: "SUPER_ADMIN" },
    });

    const permissions = await Permission.countDocuments();

    const recentUsers = await User.find()
      .select("name email status")
      .populate("role")
      .sort({ createdAt: -1 })
      .limit(5);

    const roleSummary = await Role.find({
      name: { $ne: "SUPER_ADMIN" },
    }).select("name permissions");

    return res.json({
      users,
      activeUsers,
      pendingUsers,
      roles,
      permissions,
      recentUsers,
      roleSummary,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};