const Team = require("../models/team.model");
const Player = require("../models/player.model");

const getTeamPlayers = async (req, res) => {
  const userId = req.user._id;

  const team = await Team.findOne({
    userId,
  });

  if (!team) return res.status(400).json({ message: "User Has No Team!" });

  const players = await Player.find({
    teamId: team._id,
  });

  return res.status(200).json(players);
};

module.exports = {
  getTeamPlayers,
};
