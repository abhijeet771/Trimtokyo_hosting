import express from "express";
import { addToCart, getCart, deleteCartItem } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add item to cart
router.post("/add", authMiddleware, addToCart);

// Get user's cart
router.get("/", authMiddleware, getCart);

// Delete an item from cart
router.delete("/:id", authMiddleware, deleteCartItem);

export default router;
