import BarberProfile from "../models/BarberProfile.js";
import User from "../models/User.js";

/* =========================
   GET APPROVED STORES
   GET /api/stores
========================= */
export const getApprovedStores = async (req, res) => {
  try {
    const stores = await BarberProfile.find({
      approvalStatus: "approved"
    })
      .populate("userId", "name")
      .select("shopName location services userId");

    res.status(200).json({
      success: true,
      stores: stores.map(s => ({
        _id: s._id,
        name: s.shopName,
        location: s.location,
        barberName: s.userId.name
      }))
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET STORE BY ID
   GET /api/stores/:storeId
========================= */
export const getStoreById = async (req, res) => {
  try {
    const store = await BarberProfile.findOne({
      _id: req.params.storeId,
      approvalStatus: "approved"
    }).populate("userId", "name email");

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json({
      _id: store._id,
      name: store.shopName,
      location: store.location,
      barberName: store.userId.name
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET SERVICES BY STORE
   GET /api/stores/:storeId/services
========================= */
export const getServicesByStore = async (req, res) => {
  try {
    const store = await BarberProfile.findOne({
      _id: req.params.storeId,
      approvalStatus: "approved"
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(store.services || []);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
