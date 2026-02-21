import express from "express";
import {
  createRole,
  getRoles,
  updateRole,
} from "../controllers/roleController.js";
const router = express.Router();

router.get("/roles", getRoles);
router.post("/roles", createRole);
router.patch("/roles/:id", updateRole);

export default router;
