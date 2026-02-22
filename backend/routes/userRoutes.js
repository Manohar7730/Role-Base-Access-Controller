import express from "express";
import {
  assignRoleToUser,
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

export default router;
