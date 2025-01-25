require("dotenv").config();
const Bull = require("bull");
const Team = require("./models/team.model");
const Player = require("./models/player.model");
const Position = require("./models/position.model");

const { connectToMongoDB } = require("./configs/mongoDb.configs");

const { REDIS_PORT, REDIS_HOST } = process.env;
const redisOptions = {
  redis: { host: REDIS_HOST, port: REDIS_PORT },
};

const teamQueue = new Bull("team", redisOptions);

const assignPlayersToTeam = async (teamId) => {
  const positions = await Position.find();
  const positionIds = {};
  positions.forEach((position) => {
    positionIds[position.name] = position._id;
  });

  const goalkeepers = await Player.find({
    position: positionIds["Goalkeeper"],
    teamId: null,
  }).limit(3);
  const defenders = await Player.find({
    position: positionIds["Defender"],
    teamId: null,
  }).limit(6);
  const midfielders = await Player.find({
    position: positionIds["Midfielder"],
    teamId: null,
  }).limit(6);
  const attackers = await Player.find({
    position: positionIds["Attacker"],
    teamId: null,
  }).limit(5);

  const teamPlayers = [
    ...goalkeepers,
    ...defenders,
    ...midfielders,
    ...attackers,
  ];

  const playerIds = teamPlayers.map((player) => player._id);
  
  await Player.updateMany(
    { _id: { $in: playerIds } },
    { teamId }
  );
};

teamQueue.process(async (process, done) => {
  connectToMongoDB();
  const userId = process.data.userId;
  console.log("Creating User's Team for:", userId);

  try {
    const team = {
      userId: userId,
      budget: 5000000,
      teamName: userId + " Team",
    };

    const createdTeam = await Team.create(team);

    await assignPlayersToTeam(createdTeam._id);

    console.log("Team Created:", team.teamName);

    done();
  } catch (error) {
    console.error("Error creating team:", error);
    done(error);
  }
});

module.exports = teamQueue
