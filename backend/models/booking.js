const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema(
  {
   
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

  
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",   
      required: true,
    },

    
    workerId: {
      type: Schema.Types.ObjectId,
      ref: "Worker", // worker model
      required: true,
    },

  
    serviceDate: {
      type: Date,
      required: true,
    },

   
    time: {
      type: String,
      required: true,
    },

   
    address: {
const BookingSchema = new Schema(
  {
    customerId:{
      type: Schema.Types.ObjectId,
      ref:"user",
      required: true
    },

    workerId:{
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    service:{
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Online", "Wallet"],
      required: true,
    },

  
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Online", "Wallet"],
      required: true,
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

    
    serviceCategory: {
      type: String, 
      required: true,
    },

    serviceName: {
      type: String, 
      required: true,
    },

    estimatedTime: {
      type: String, 
    },

    notes: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

   
    serviceOTP: {
      type: String, 
    },

   
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },


    review: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
module.exports = mongoose.model("booking", BookingSchema);
