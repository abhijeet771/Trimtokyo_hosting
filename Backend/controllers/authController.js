import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });

    res.json({
      success: true,
      message: "Registration successful",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Decide redirect based on role
    let redirect = "user-dashboard.html";
    if (user.role === "barber") redirect = "barber-dashboard.html";

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      role: user.role,
      redirect,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
