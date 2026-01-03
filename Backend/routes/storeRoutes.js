import express from "express";
import {
  getApprovedStores,
  getStoreById,
  getServicesByStore
} from "../controllers/storeController.js";

const router = express.Router();

/*
  GET /api/stores
  → Returns ONLY approved barbers (used by service.html)
*/
router.get("/", getApprovedStores);

/*
  GET /api/stores/:storeId
  → Store details page
*/
router.get("/:storeId", getStoreById);

/*
  GET /api/stores/:storeId/services
  → Services of a store
*/
router.get("/:storeId/services", getServicesByStore);

export default router;
