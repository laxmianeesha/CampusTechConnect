const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


/* ===========================
   🔥 ADD EVENT (Organiser Only)
=========================== */
router.post("/add", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const dbUser = await User.findById(req.user.id);

    if (!dbUser || dbUser.role !== "organiser" || dbUser.status !== "approved") {
      return res.status(403).json({
        message: "You are not approved by admin"
      });
    }

    const { title, college, description, date, participantLimit, location,
  mode,
  prizes,
  rules,
  timeline,
   teamSize
} = req.body;
const today = new Date().toISOString().split("T")[0];

    if (date < today) {
      return res.status(400).json({
        message: "❌ Cannot create event with past date"
      });
    }

    const newEvent = new Event({
      title,
  college,
  description,
  date,
  participantLimit,
  organiser: req.user.id,
  image: req.file ? `uploads/${req.file.filename}` : null,
  location,
  mode,
teamSize: Number(teamSize),
  prizes: prizes ? JSON.parse(prizes) : [],
  rules: rules ? JSON.parse(rules) : [],
  timeline: timeline ? JSON.parse(timeline) : []
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
/* ===========================
   📥 GET ALL EVENTS
=========================== */
router.get("/all-users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organiser", "name email")
      .populate("registrations.student", "name email");
      const now = new Date();
     const updatedEvents = events.map(event => {
      return {
        ...event._doc,
        eventStatus: new Date(event.date) < now ? "expired" : "active"
      };
    });

    res.json(updatedEvents);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



/* ===========================
   📝 REGISTER (Student Only)
=========================== */
router.post("/register", verifyToken, async (req, res) => {
  try {
    console.log("BODY:", req.body);

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can register" });
    }

    const {
      eventId,
      teamName,
      teamMembers,
      collegeName,
      yearOfStudy,
      leaderName,
      email,
      phone,
      branch,
      projectTitle,
      description
    } = req.body;

    // ✅ Find event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!teamMembers || !Array.isArray(teamMembers)) {
      return res.status(400).json({ message: "Invalid team members" });
    }

    const memberCount = teamMembers.length;

    if (memberCount > event.teamSize) {
      return res.status(400).json({
        message: `Maximum ${event.teamSize} members allowed`
      });
    }

    const alreadyRegistered = event.registrations.find(
      (reg) => reg.student.toString() === req.user.id
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.registrations.push({
      student: req.user.id,
      teamName,
      teamMembers,
      collegeName,
      yearOfStudy,
      leaderName,
      email,
      phone,
      branch,
      projectTitle,
      description,
      status: "pending"
    });

    await event.save();

    res.json({
      message: "Registration request sent (Pending approval)"
    });

  } catch (error) {
    console.log(error);   
    res.status(500).json({ message: "Server error" });
  }
});



/* ===========================
   ✅ APPROVE (Organiser Only)
=========================== */
router.put("/approve", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { eventId, studentId } = req.body;

    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Ensure organiser owns the event
    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const registration = event.registrations.find(
      (reg) => reg.student.toString() === studentId
    );

    if (!registration)
      return res.status(404).json({ message: "Registration not found" });

    const approvedCount = event.registrations.filter(
      (r) => r.status === "approved"
    ).length;

    if (approvedCount >= event.participantLimit) {
      return res.status(400).json({ message: "Participant limit reached" });
    }

    registration.status = "approved";

    await event.save();

    res.json({ message: "Registration approved" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});




/* ===========================
   ❌ REJECT (Organiser Only)
=========================== */
router.put("/reject", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { eventId, studentId } = req.body;

    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Ensure organiser owns the event
    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const registration = event.registrations.find(
      (reg) => reg.student.toString() === studentId
    );

    if (!registration)
      return res.status(404).json({ message: "Registration not found" });

    registration.status = "rejected";

    await event.save();

    res.json({ message: "Registration rejected" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { teamSize } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    event.teamSize = Number(teamSize);

    await event.save();

    res.json({ message: "Event updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
/* ===========================
   🗑 DELETE EVENT (Organiser Only)
=========================== */
router.delete("/delete/:eventId", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "organiser") {
      return res.status(403).json({ message: "Only organisers can delete events" });
    }

    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event)
      return res.status(404).json({ message: "Event not found" });

    // Ensure organiser deletes only their event
    if (event.organiser.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(eventId);

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;