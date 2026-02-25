import mongoose from "mongoose";
import Role from "../models/Role.js";
import AppError from "../utils/AppError.js";

export const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({
      name: { $ne: "SUPER_ADMIN" },
    }).populate("permissions");

    return res.status(200).json({
      message: "Roles fetched",
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

export const createRole = async (req, res, next) => {
  try {
    const { name, permissions } = req.body;

    const checkExist = await Role.findOne({ name });

    if (checkExist) {
      return next(new AppError("Role already exist", 400));
    }

    if (!Array.isArray(permissions)) {
      return next(new AppError("permissions must be array", 400));
    }

    const role = await Role.create({
      name,
      permissions,
    });

    const populatedRole = await Role.findById(role._id).populate("permissions");

    return res.status(201).json({
      message: "role created",
      data: populatedRole,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const { permissions } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Invalid ID", 400));
    }

    const updatedRole = await Role.findByIdAndUpdate(
      { _id: id },
      { permissions },
      { new: true }
    );

    if (!updatedRole) {
      return next(new AppError("Role not found", 404));
    }

    return res.status(200).json({
      message: "permissions updated",
      data: updatedRole,
    });
  } catch (error) {
    next(error);
  }
};