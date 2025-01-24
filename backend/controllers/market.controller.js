const Player = require("../models/player.model");
const Team = require("../models/team.model");

const getMarketPlayers = async (req, res) => {
  try {
    let { order, filterBy } = req.query;
    order = parseInt(order);

    let market = [];
    let sortField = "";

    if (order !== 1 && order !== -1) order = 1;
    if (
      filterBy !== "playerName" &&
      filterBy !== "teamName" &&
      filterBy !== "price"
    )
      filterBy = "playerName";

    switch (filterBy) {
      case "playerName":
        sortField = "name";
        break;
      case "teamName":
        market = await Player.find({})
          .populate({
            path: "teamId",
          })
          .lean();

        market.sort((a, b) => {
          const teamA = a.teamId?.teamName || "";
          const teamB = b.teamId?.teamName || "";
          return order === 1
            ? teamA.localeCompare(teamB) // Ascending
            : teamB.localeCompare(teamA); // Descending
        });
        return res.status(200).json(market);

      case "price":
        sortField = "askingPrice";
        break;

      default:
        break;
    }
    market = await Player.find({ onTransferList: true })
      .populate("teamId")
      .sort({ [sortField]: order });

    return res.status(200).json(market);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const buyPlayer = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const { playerId } = req.body;

    const team = await Team.findOne({ userId });

    if (!team) return res.status(400).json({ message: "User has No Team!" });

    const playerCount = await Player.countDocuments({ teamId: team._id });
    if (playerCount >= 25)
      return res.status(400).json({ message: "Your Team is Full!" });

    const player = await Player.findById(playerId);
    if (!player || !player.onTransferList) {
      return res
        .status(400)
        .json({ message: "Player Does not Exist in the Market!" });
    }

    if (player.teamId.toString() === team._id.toString())
      return res
        .status(400)
        .json({ message: "Cannot Purchase your Own Player!" });

    player.teamId = team._id;
    player.onTransferList = false;
    player.baseValue = player.askingPrice;
    player.askingPrice = 0;

    player.save();

    return res.status(200).json({ player, message: "Player Purchased" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const sellPlayer = async (req, res) => {};

module.exports = {
  getMarketPlayers,
  buyPlayer,
  sellPlayer,
};
