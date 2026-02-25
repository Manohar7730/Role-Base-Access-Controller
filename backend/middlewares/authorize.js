import User from "../models/User.js";
import AppError from "../utils/AppError.js";

const authorize = (permission) => async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return next(new AppError("Not authenticated", 401));
    }

    const user = await User.findById(userId).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (!user.role) {
      return next(new AppError("No role assigned", 403));
    }
    if (user.role.name === "SUPER_ADMIN") {
      return next();
    }
    const permissionKeys = user.role.permissions.map((p) => p.key);

    if (!permissionKeys.includes(permission)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
