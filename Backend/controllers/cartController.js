import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { serviceId, serviceName, price } = req.body;
    const userId = req.user.id;

    if (!serviceId || !serviceName || !price) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const item = await Cart.create({ userId, serviceId, serviceName, price });
    res.json({ success: true, message: "Added to cart", item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Cart.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await Cart.find({ userId });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
