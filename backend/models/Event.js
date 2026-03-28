
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  teamMembers: {
    type: [String],
    required: true
  },
  collegeName: {
    type: String,
    required: true
  },
  yearOfStudy: {
    type: String,
    required: true
  },
  leaderName: String,
  email: String,
  phone: String,
  branch: String,
  projectTitle: String,
  description: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    college: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    participantLimit: {
      type: Number,
      required: true
    },
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    image: {
      type: String
    },
    location: String,
    mode: {
      type: String,
      default: "Online"
    },
    teamSize: {
  type: Number,
  required: true
},
    prizes: [
      {
        title: String,
        amount: String
      }
    ],
    rules: [String],
    timeline: [
      {
        title: String,
        startDate: Date,
        endDate: Date
      }
    ],
    registrations: [registrationSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

