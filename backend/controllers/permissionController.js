import Permission from "../models/Permission.js";
import AppError from "../utils/AppError.js";

export const getPermissions = async (req, res, next) => {
  try {
    const permissions = await Permission.find({});

    return res.status(200).json({
      message: "Permissions fetched",
      data: permissions,
    });
  } catch (error) {
    next(error);
  }
};

export const createPermission = async (req, res, next) => {
  try {
    const { key, description } = req.body;

    const checkExist = await Permission.findOne({ key });

    if (checkExist) {
      return next(new AppError("Permission Key Exists", 400));
    }

    const permission = await Permission.create({
      key,
      description,
    });

    return res.status(201).json({
      message: "Permission key created",
      data: permission,
    });
  } catch (error) {
    next(error);
  }
};
