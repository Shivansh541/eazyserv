const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "JSONWebTokenSecretKey";


const Booking = require("../models/booking");


router.post(
  "/add",
  [
    body("bookingId").notEmpty().withMessage("bookingId is required"),

    body("customerId").notEmpty().withMessage("customerId is required"),

    body("workerId").notEmpty().withMessage("workerId is required"),

    body("serviceDate")
      .notEmpty()
      .withMessage("Service date is required")
      .isISO8601()
      .withMessage("Enter a valid date"),

    body("time").notEmpty().withMessage("Time is required"),

    body("paymentMode")
      .isIn(["Cash", "UPI", "Card", "Online", "Wallet"])
      .withMessage("Invalid payment mode"),

    body("address").notEmpty().withMessage("Address is required"),

    body("totalAmount")
      .isNumeric()
      .withMessage("Total amount must be numeric"),

    body("finalPaid")
      .isNumeric()
      .withMessage("Final paid must be numeric"),

    body("serviceCategory").notEmpty().withMessage("Service category required"),

    body("serviceName").notEmpty().withMessage("Service name required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const booking = new Booking(req.body);
      const savedBooking = await booking.save();

      return res.json({
        success: true,
        message: "Booking created successfully",
        data: savedBooking,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);

router.put(
  "/update/:id",
  [
    body("status")
      .optional()
      .isIn([
        "Pending",
        "Accepted",
        "OnTheWay",
        "InProgress",
        "Completed",
        "Cancelled",
        "Rejected",
        "Refunded",
      ])
      .withMessage("Invalid status value"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!updated) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json({
        success: true,
        message: "Booking updated",
        data: updated,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customerId")
      .populate("workerId");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true, data: booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId")
      .populate("workerId")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/customer/:customerId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      customerId: req.params.customerId,
    });

    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/worker/:workerId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      workerId: req.params.workerId,
    });

    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking cancelled",
      data: booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;