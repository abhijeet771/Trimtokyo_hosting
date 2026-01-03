import express from "express";
import { getAllOrders } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

/*
  GET /api/admin/order/all
  Admin can view all orders
*/
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

export default router;
