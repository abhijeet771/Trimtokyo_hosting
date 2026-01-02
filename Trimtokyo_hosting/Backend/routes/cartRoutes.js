import express from "express";
import {
  addToCart,
  getCart,
  deleteCartItem
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/:id", authMiddleware, deleteCartItem);

export default router;
