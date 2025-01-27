const express = require("express");
const { getTeamPlayers } = require("../controllers/team.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", authMiddleware, getTeamPlayers);

module.exports = router;
