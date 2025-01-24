require("dotenv").config({path:"../.env"})

const mongoose = require("mongoose");
const Position = require("../models/position.model");

const { connectToMongoDB } = require("../configs/mongoDb.configs");

const seedPositions = async () => {
    console.log(process.env.MONGODB_URL);
    
  try {
    connectToMongoDB();

    const positions = [
      { name: "Goalkeeper" },
      { name: "Defender" },
      { name: "Midfielder" },
      { name: "Attacker" },
    ];

    for (const position of positions) {
      await Position.updateOne(
        { name: position.name },
        { $set: position },
        { upsert: true }
      );
    }

    console.log("Positions have been seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding positions:", error);
    process.exit(1);
  }
};

seedPositions();
