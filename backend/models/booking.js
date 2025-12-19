const mongoose = require("mongoose");
const { Schema } = mongoose;
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
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("booking", BookingSchema);
