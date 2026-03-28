// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ["student", "organiser"],
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["student", "organiser", "admin"], 
    required: true
  },
idProof: {
  type: String
},
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: function () {
      return this.role === "organiser" ? "pending" : "approved";
    }
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);