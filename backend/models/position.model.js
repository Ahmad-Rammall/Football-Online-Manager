const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Position = mongoose.model("Player", positionSchema);

module.exports = Position;
