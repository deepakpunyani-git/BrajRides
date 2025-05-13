const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RidesVehicle",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RidesUser",
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

    cancelRequest: {
      type: Boolean,
      default: false,
    },
    
    cancelReason: {
      type: String,
    },
    
    cancelRequestedAt: {
      type: Date,
    },
    
    cancelRequestStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: "pending",

    },
    
    cancelRequestActionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RidesUser',
    },
    
    cancelRequestActionAt: {
      type: Date,
    }, 
    cardLast4: { type: String },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
