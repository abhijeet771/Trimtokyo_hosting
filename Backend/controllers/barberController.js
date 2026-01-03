import Order from "../models/Order.js";

/* GET BARBER BOOKINGS */
export const getBarberBookings = async (req, res) => {
  try {
    const bookings = await Order.find({ barberId: req.user.id })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
