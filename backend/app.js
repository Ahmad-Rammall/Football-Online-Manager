require("dotenv").config();
const express = require("express");
const app = express();
const { connectToMongoDB } = require("./configs/mongoDb.configs");

const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("common"));

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const marketRoutes = require("./routes/market.routes");
app.use("/market", marketRoutes);

const teamRoutes = require("./routes/team.routes");
app.use("/team", teamRoutes);

app.listen(process.env.PORT, () => {
  connectToMongoDB();
  console.log("Server Running on :", process.env.PORT);
});
