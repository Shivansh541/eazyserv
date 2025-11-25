const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Booking = require("../models/booking");
const JWT_SECRET = "JSONWebTokenSecretKey";



router.post(
  "/create",
  fetchUser, 
  [
    body("workerId").notEmpty(),
    body("serviceCategory").notEmpty(),
    body("serviceName").notEmpty(),
    body("serviceDate").notEmpty(),
    body("time").notEmpty(),
    body("address").notEmpty(),
    body("paymentMode")
      .isIn(["Cash", "UPI", "Card", "Online", "Wallet"]),
    body("totalAmount").isNumeric(),
    body("finalPaid").isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      let data = req.body;

     
      data.customerId = req.user.id;

    
      data.bookingId = "BKG-" + Date.now();

      const booking = new Booking(data);
      await booking.save();

      res.json({ success: true, booking });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);






router.put("/cancel/:id", fetchUser, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      $or: [
        { customerId: req.user.id },
        { workerId: req.user.id }
      ]
    });

    if (!booking)
      return res.status(404).json({ message: "Not allowed or booking not found" });

    booking.status = "Cancelled";
    await booking.save();

    res.json({ success: true, message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put(
  "/review/:id",
  fetchUser,
  [
    body("rating").optional().isInt({ min: 1, max: 5 }),
    body("review").optional().isString()
  ],
  async (req, res) => {
    try {
      const booking = await Booking.findOne({
        _id: req.params.id,
        $or: [
          { customerId: req.user.id },
          { workerId: req.user.id }
        ]
      });

      if (!booking)
        return res.status(403).json({ message: "You cannot review this booking" });

      booking.rating = req.body.rating;
      booking.review = req.body.review;

      await booking.save();

      res.json({ success: true, message: "Review added", booking });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.get("/customer/:customerId", fetchUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.customerId });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/worker/:workerId", fetchUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.params.workerId });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;