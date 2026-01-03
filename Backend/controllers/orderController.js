import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.find({ userId });
    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // 🔴 IMPORTANT: all cart items belong to ONE barber
    const barberId = cartItems[0].storeId;
    if (!barberId) {
      return res.status(400).json({
        success: false,
        message: "Barber not found for this order"
      });
    }

    // Map cart items to Order items
    const orderItems = cartItems.map(item => ({
      serviceId: String(item.serviceId),
      serviceName: item.serviceName,
      price: item.price
    }));

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    const order = await Order.create({
      userId,
      barberId,
      items: orderItems,
      totalAmount,
      paymentMethod: "COD",
      status: "Pending"
    });

    // Clear cart
    await Cart.deleteMany({ userId });

    res.json({
      success: true,
      message: "Order placed successfully!",
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
