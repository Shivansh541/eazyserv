const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const fetchuser = require('../middleware/fetchuser')

router.post('/addnotification', async (req, res) => {
  try {
    const { user, title, message } = req.body;

    if (!user || !title || !message) {
      return res.status(400).json({ error: "user, title, message are required" });
    }

    const notification = await Notification.create({
      user,
      title,
      message,
    });

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error("Create Notification Error:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// Get notifications for a user
router.get("/getnotification", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "user query param is required" });
    }

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("Get Notifications Error:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.patch("/:id/read", fetchuser, async (req, res) => {
  try {
    const notifId = req.params.id;

    const notification = await Notification.findOneAndUpdate(
      { _id: notifId, user: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error("Mark As Read Error:", error);
    res.status(500).json({ error: "Failed to update notification" });
  }
});

// Mark all notifications as read
router.patch("/readall", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read"
    });
  } catch (error) {
    console.error("Mark All Read Error:", error);
    res.status(500).json({ error: "Failed to update notifications" });
  }
});

module.exports = router;
