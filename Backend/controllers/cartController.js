import Cart from "../models/Cart.js";

/* =========================
   ADD TO CART
========================= */
export const addToCart = async (req, res) => {
  try {
    const { serviceId, serviceName, price } = req.body;
    const userId = req.user.id;

    if (!serviceId || !serviceName || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const existingItem = await Cart.findOne({ userId, serviceId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();

      return res.json({
        success: true,
        message: "Service quantity updated",
        item: existingItem
      });
    }

    const item = await Cart.create({
      userId,
      serviceId,
      serviceName,
      price,
      quantity: 1
    });

    res.json({
      success: true,
      message: "Service added to cart",
      item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   GET USER CART
========================= */
export const getCart = async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   DELETE CART ITEM
========================= */
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Cart.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    res.json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
