import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) { // isAdmin field in User model
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: " + error.message });
  }
};
