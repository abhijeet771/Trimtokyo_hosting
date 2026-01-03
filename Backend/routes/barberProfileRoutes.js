import express from "express";
import {
  createOrUpdateProfile,
  getMyProfile
} from "../controllers/barberProfileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.post("/", authMiddleware, createOrUpdateProfile);

export default router;
