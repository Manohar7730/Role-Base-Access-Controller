import express from "express";
import {
  createRole,
  getRoles,
  updateRole,
} from "../controllers/roleController.js";
import authorize from "../middlewares/authorize.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/roles", authMiddleware, authorize("role.read"), getRoles);

router.post("/roles", authMiddleware, authorize("role.create"), createRole);

router.patch(
  "/roles/:id",
  authMiddleware,
  authorize("role.update"),
  updateRole,
);

export default router;
