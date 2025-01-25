require("dotenv").config({path:"../.env"})
const Position = require("../models/position.model"); // Position model
const Player = require("../models/player.model");
const { connectToMongoDB } = require("../configs/mongoDb.configs");

connectToMongoDB();

const baseValues = {
  Goalkeeper: 500000,
  Defender: 400000,
  Midfielder: 600000,
  Attacker: 700000,
};

// Generate players
const generatePlayers = (positionId, positionName, count) => {
  const players = [];
  for (let i = 1; i <= count; i++) {
    players.push({
      teamId: null,
      position: positionId,
      name: `${positionName} ${i}`,
      baseValue: baseValues[positionName],
      onTransferList: false,
      askingPrice: 0,
    });
  }
  return players;
};

const createPlayers = async () => {
  try {
    const positions = await Position.find();

    if (!positions || positions.length === 0) {
      console.error("No positions found in the database!");
      return;
    }

    // Map positions to generate players
    const players = [];
    for (const position of positions) {
      if (position.name === "Goalkeeper") {
        players.push(...generatePlayers(position._id, position.name, 15));
      } else if (position.name === "Defender") {
        players.push(...generatePlayers(position._id, position.name, 30));
      } else if (position.name === "Midfielder") {
        players.push(...generatePlayers(position._id, position.name, 30));
      } else if (position.name === "Attacker") {
        players.push(...generatePlayers(position._id, position.name, 25));
      }
    }

    const insertedPlayers = await Player.insertMany(players);
    console.log(
      `Inserted ${insertedPlayers.length} players into the database.`
    );
    process.exit()
  } catch (error) {
    console.error("Error creating players:", error);
    process.exit(1)
  }
};

createPlayers();
