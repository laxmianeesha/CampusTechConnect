const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const verifyToken = require("../middleware/authMiddleware");

// Get pending organisers
router.get("/pending", verifyToken, async (req, res) => {
  try {
    const users = await User.find({
      role: "organiser",
      status: "pending"
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Approve organiser
router.put("/approve/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "approved";
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Reject organiser
router.put("/reject/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "rejected";
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE Event
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    console.log("👉 Delete Event ID:", req.params.id);

    // Optional: role check (VERY IMPORTANT)
    if (req.user.role !== "organiser" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    console.log("Delete ID:", req.params.id);

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;