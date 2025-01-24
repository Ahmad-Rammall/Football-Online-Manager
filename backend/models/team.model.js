const mongoose = require("mongoose");
const User = require("./user.model");

const teamSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      default: 5000000,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
