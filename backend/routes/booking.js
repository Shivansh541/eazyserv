const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

const Booking = require("../models/booking");


router.post(
  "/create",
  fetchUser, // JWT required
  [
    body("workerId").notEmpty(),
    body("service").notEmpty(),
    body("date").notEmpty(),
    body("time").notEmpty(),
    body("address").notEmpty(),
    body("paymentMode")
      .isIn(["Cash", "UPI", "Card", "Online", "Wallet"])
      .withMessage("Invalid payment mode"),
    body("totalAmount").isNumeric(),
    body("finalPaid").isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      let data = req.body;

      // Customer comes from token
      data.customerId = req.user.id;

      const booking = new Booking(data);
      await booking.save();

      res.json({ success: true, booking });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);


router.get("/customer/my-bookings", fetchUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.get("/worker/my-jobs", fetchUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user.id });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/cancel/:id", fetchUser, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      $or: [
        { customerId: req.user.id },
        { workerId: req.user.id }
      ],
    });

    if (!booking)
      return res.status(403).json({ message: "No permission to cancel this booking" });

    booking.status = "Cancelled";
    await booking.save();

    res.json({ success: true, message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.put("/complete/:id", fetchUser, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      workerId: req.user.id, // Only worker can complete
    });

    if (!booking)
      return res.status(403).json({ message: "Not allowed to complete" });

    booking.status = "Completed";
    await booking.save();

    res.json({ success: true, message: "Marked as completed", booking });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.get("/by-customer/:customerId", fetchUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.customerId });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.get("/by-worker/:workerId", fetchUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.params.workerId });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
