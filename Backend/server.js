import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Core routes
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";

// Barber & Admin routes
import barberProfileRoutes from "./routes/barberProfileRoutes.js";
import barberRoutes from "./routes/barberRoutes.js";
import adminBarberRoutes from "./routes/adminBarberRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ---------------- ROUTES ----------------

// Public / User
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/stores", storeRoutes);

// Barber
app.use("/api/barber/profile", barberProfileRoutes);
app.use("/api/barber", barberRoutes);

// Admin
app.use("/api/admin", adminBarberRoutes);
app.use("/api/admin/order", adminOrderRoutes);

// ---------------- DATABASE ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
