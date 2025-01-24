const Player = require("../models/player.model");

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

const buyPlayer = async (req, res) => {};

const sellPlayer = async (req, res) => {};

module.exports = {
  getMarketPlayers,
  buyPlayer,
  sellPlayer,
};
