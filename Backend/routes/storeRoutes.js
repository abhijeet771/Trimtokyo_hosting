import express from "express";
import {
  getStoreById,
  getServicesByStore
} from "../controllers/storeController.js";

const router = express.Router();

router.get("/:storeId", getStoreById);
router.get("/:storeId/services", getServicesByStore);

export default router;
