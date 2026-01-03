import BarberProfile from "../models/BarberProfile.js";
import Order from "../models/Order.js";

/* =========================
   GET PENDING BARBER PROFILES
========================= */
export const getPendingBarbers = async (req, res) => {
  try {
    const barbers = await BarberProfile.find({
      approvalStatus: "pending"
    }).populate("userId", "name email");

    res.json({
      success: true,
      barbers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   APPROVE BARBER
========================= */
export const approveBarber = async (req, res) => {
  try {
    const barber = await BarberProfile.findById(req.params.id);

    if (!barber) {
      return res.status(404).json({
        success: false,
        message: "Barber profile not found"
      });
    }

    if (barber.approvalStatus === "approved") {
      return res.status(400).json({
        success: false,
        message: "Barber is already approved"
      });
    }

    barber.approvalStatus = "approved";
    await barber.save();

    res.json({
      success: true,
      message: "Barber approved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET ALL ORDERS (ADMIN)
========================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      // ❌ REMOVED barberId populate (field does not exist)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
