import express from "express";
import { getBarberBookings } from "../controllers/barberController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/bookings", authMiddleware, getBarberBookings);

export default router;
