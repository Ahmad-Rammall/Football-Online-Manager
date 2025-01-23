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

app.listen(process.env.PORT, () => {
  connectToMongoDB();
  console.log("Server Running on :", process.env.PORT);
});
