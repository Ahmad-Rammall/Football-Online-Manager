const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    baseValue: {
      type: Number,
      required: true,
    },
    onTransferList: {
      type: Boolean,
      default: false,
    },
    askingPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
