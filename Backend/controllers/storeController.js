import BarberProfile from "../models/BarberProfile.js";

/* =========================
   GET APPROVED STORES
   GET /api/stores
========================= */
export const getApprovedStores = async (req, res) => {
  try {
    const barbers = await BarberProfile.find({
      approvalStatus: "approved"
    })
      .populate("userId", "name")
      .select("shopName location userId");

    const stores = barbers.map(b => ({
      _id: b._id,
      shopName: b.shopName,
      location: b.location,
      barberName: b.userId?.name || "Barber",
      image: `https://picsum.photos/seed/${b._id}/600/400`
    }));

    res.status(200).json({
      success: true,
      stores
    });

  } catch (error) {
    console.error("GET APPROVED STORES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load stores"
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
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    res.json({
      _id: store._id,
      shopName: store.shopName,
      location: store.location,
      barberName: store.userId?.name || "Barber",
      image: `https://picsum.photos/seed/${store._id}/600/400`
    });

  } catch (error) {
    console.error("GET STORE BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
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
    }).select("services");

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    res.status(200).json(store.services || []);

  } catch (error) {
    console.error("GET SERVICES ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
