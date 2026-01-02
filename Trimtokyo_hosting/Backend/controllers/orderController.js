import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.find({ userId });
    if (cartItems.length === 0) return res.status(400).json({ success: false, message: "Cart is empty" });

    // Map cart items to Order items
    const orderItems = cartItems.map(item => ({
      serviceId: String(item.serviceId),   // <-- ensure string
      serviceName: item.serviceName,
      price: item.price
    }));

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      paymentMethod: "COD",
      status: "Pending"
    });

    await Cart.deleteMany({ userId });

    res.json({ success: true, message: "Order placed successfully!", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
