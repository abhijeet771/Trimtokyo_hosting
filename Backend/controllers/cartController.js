import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { storeId, serviceId, serviceName, price } = req.body;
    const userId = req.user.id;

    if (!storeId || !serviceId || !serviceName || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Check if same service already exists in cart
    const existingItem = await Cart.findOne({
      userId,
      storeId,
      serviceId
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();

      return res.json({
        success: true,
        message: "Service quantity updated",
        item: existingItem
      });
    }

    // Create new cart item
    const item = await Cart.create({
      userId,
      storeId,
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

// GET USER CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const items = await Cart.find({ userId }).sort({ createdAt: -1 });

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

// DELETE CART ITEM
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
