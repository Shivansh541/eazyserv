const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const Booking = require('../models/booking')
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')

router.post('/addreview',fetchuser, async(req,res)=>{
    try{
        const {bookingId, rating, reviewText} = req.body;

        const booking = await Booking.findById(bookingId)

        if (!booking)
            return res.status(404).json({ error: "Booking not found" });

        if (booking.customerId.toString() !== req.user.id)
            return res.status(403).json({ error: "Not allowed" });

        if (booking.status !== "completed")
            return res.status(400).json({ error: "You can only review completed bookings" });

        const existingReview = await Review.findOne({ bookingId });
        if (existingReview)
            return res.status(400).json({ error: "You already reviewed this booking" });

        const review = await Review.create({
            bookingId,
            customerId: booking.customerId,
            workerId: booking.workerId,
            rating,
            reviewText,
        });
        const reviews = await Review.find({ workerId: booking.workerId });

        if (reviews.length === 0) {
            await User.findByIdAndUpdate(booking.workerId, {
                "workerInfo.rating": 0
            });
            return;
        }

        const avgRating =
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        await User.findByIdAndUpdate(booking.workerId, {
            "workerInfo.rating": avgRating
        });

        res.json({ success: true, review });
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
})

router.get("/worker/:workerId", async (req, res) => {
  try {
    const reviews = await Review.find({ worker: req.params.workerId })
      .populate("customer", "name profilePhoto")
      .populate("booking", "service date");

    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/booking/:bookingId", async (req, res) => {
  try {
    const review = await Review.findOne({ booking: req.params.bookingId });

    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router