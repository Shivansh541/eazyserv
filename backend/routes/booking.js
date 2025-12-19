const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const Booking = require("../models/booking");


router.post(
  "/create",
  fetchuser, // JWT required
  [
    body("workerId").notEmpty(),
    body("service").notEmpty(),
    body("date").notEmpty(),
    body("address").notEmpty(),
    body("paymentMode")
      .isIn(["Cash", "UPI", "Card", "Online", "Wallet"])
      .withMessage("Invalid payment mode"),
    body("totalAmount").isNumeric(),
    body("discount").isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      let data = req.body;
      data.finalPaid = data.totalAmount - data.discount
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


router.get("/customer/my-bookings", fetchuser, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.get("/worker/my-jobs", fetchuser, async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.user.id });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/cancel/:id", fetchuser, async (req, res) => {
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


router.put("/complete/:id", fetchuser, async (req, res) => {
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
module.exports = router;
