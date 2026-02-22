import express from "express";
import {
  createPermission,
  getPermissions,
} from "../controllers/permissionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorize.js";
const router = express.Router();

router.get("/permissions", authMiddleware, authorize("permission.read"), getPermissions);
router.post("/permissions", authMiddleware, authorize("permission.create"), createPermission);

export default router;
