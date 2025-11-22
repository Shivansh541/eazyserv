const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    // Unique booking ID
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    // Customer
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Worker
    workerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // same user model but with role "worker"
      required: true,
    },

    // Service Category & Name
    serviceCategory: {
      type: String,
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
    },

    // Date + Time
    serviceDate: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    // Address
    address: {
      type: String,
      required: true,
    },

    // Payment
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Online", "Wallet"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    finalPaid: {
      type: Number,
      required: true,
    },

    // Booking Status Flow
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "OnTheWay",
        "InProgress",
        "Completed",
        "Cancelled",
        "Rejected",
        "Refunded",
      ],
      default: "Pending",
    },

    estimatedTime: {
      type: String,
    },

    notes: {
      type: String,
      default: "",
    },

    // OTP verification
    serviceOTP: {
      type: String,
    },

    // Rating / Review
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
