const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateFrom: {
      type: Date,
    },
    dateTo: {
      type: Date,
    },
    numberOfDays: {
      type: Number,
    },
    price: {
      type: Number,
    },
    
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },
    transactionId: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
