import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/* =========================
   REGISTER
========================= */
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });

    res.json({
      success: true,
      message: "Registration successful",
      userId: user._id
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack
    });
  }
};

/* =========================
   LOGIN
========================= */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("LOGIN REQUEST BODY:", req.body);

    const user = await User.findOne({ email });
    console.log("USER FOUND:", user);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    console.log("STORED HASH:", user.password);

    const isMatch = await user.matchPassword(password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    console.log("TOKEN GENERATED:", token);

    let redirect = "dashboard_user.html";
    if (user.role === "barber") redirect = "dashboard_barber.html";

    res.json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
      redirect
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack
    });
  }
};
