import express from "express";
import {
  adminResetPassword,
  assignRoleToUser,
  changePassword,
  getUsers,
  updateUserStatus,
} from "../controllers/userController.js";
const router = express.Router();

import authMiddleware from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorize.js";

router.get("/users", authMiddleware, authorize("user.read"), getUsers);

router.patch(
  "/users/:id/status",
  authMiddleware,
  authorize("user.update"),
  updateUserStatus,
);

router.patch(
  "/users/:id/role",
  authMiddleware,
  authorize("user.update"),
  assignRoleToUser,
);

router.post(
  "/users/change-password",
  authMiddleware,
  changePassword
);

router.patch(
  "/users/:id/reset-password",
  authMiddleware,
  authorize("user.update"),
  adminResetPassword
);

export default router;
