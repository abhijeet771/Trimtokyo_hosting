import express from "express";
import {
  getPendingBarbers,
  approveBarber
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/barbers/pending",
  authMiddleware,
  adminMiddleware,
  getPendingBarbers
);

router.put(
  "/barbers/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveBarber
);

export default router;
