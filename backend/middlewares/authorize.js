import User from "../models/User.js";
const authorize = (permission) => async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await User.findById(userId).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });
    if (!user || !user.role) {
      return res.status(403).json({ message: "No role assigned" });
    }
    if (user.role.name === "SUPER_ADMIN") {
      return next();
    }
    const permissionKeys = user.role.permissions.map((p) => p.key);

    if (!permissionKeys.includes(permission)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default authorize;
