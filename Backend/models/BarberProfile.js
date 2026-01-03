import mongoose from "mongoose";

const barberProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    shopName: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    services: [
      {
        name: String,
        price: Number
      }
    ],

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("BarberProfile", barberProfileSchema);
