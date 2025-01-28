const Team = require("../models/team.model");
const Player = require("../models/player.model");

const getTeam = async (req, res) => {
  const userId = req.user._id;

  const team = await Team.findOne({
    userId,
  });

  if (!team) return res.status(400).json({ message: "User Has No Team!" });

  const players = await Player.find({
    teamId: team._id,
  })
    .populate("position")
    .lean();

  return res.status(200).json({
    players,
    team,
  });
};

const updateTeamName = async (req, res) => {
  const userId = req.user._id;
  const teamName = req.body.teamName;

  const team = await Team.findOne({
    userId,
  });

  if (!team) return res.status(400).json({ message: "User Has No Team!" });

  team.teamName = teamName;
  await team.save();
  return res.status(200).json({ message: "Team Name Updated" });
};

module.exports = {
  getTeam,
  updateTeamName,
};
