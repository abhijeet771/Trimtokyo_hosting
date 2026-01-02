// adminOrderRoutes.js
import express from "express";
import { getAllOrders } from "../controllers/adminOrderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin route to fetch all orders
router.get("/all", authMiddleware, adminMiddleware, getAllOrders);

export default router;
