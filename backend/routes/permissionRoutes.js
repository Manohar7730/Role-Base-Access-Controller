import express from "express";
import {
  createPermission,
  getPermissions,
} from "../controllers/permissionController.js";
const router = express.Router();

router.get("/permissions", getPermissions);
router.post("/permissions", createPermission);

export default router;
