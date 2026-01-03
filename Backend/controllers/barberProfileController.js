import BarberProfile from "../models/BarberProfile.js";

/* CREATE / UPDATE BARBER PROFILE */
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shopName, location, phone, services } = req.body;

    // ✅ REQUIRED FIELD CHECK
    if (!location || location.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Location is required"
      });
    }

    if (!shopName || shopName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Shop name is required"
      });
    }

    const profile = await BarberProfile.findOneAndUpdate(
      { userId },
      {
        shopName,
        location,          // ✅ now guaranteed
        phone,
        services,
        approvalStatus: "pending"
      },
      {
        upsert: true,
        new: true,
        runValidators: true // ✅ IMPORTANT
      }
    );

    res.json({
      success: true,
      message: "Profile submitted for approval",
      profile
    });

  } catch (error) {
    console.error("BARBER PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* GET BARBER PROFILE */
export const getMyProfile = async (req, res) => {
  try {
    const profile = await BarberProfile.findOne({ userId: req.user.id });

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
