const express = require("express");
const { getTeam } = require("../controllers/team.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", authMiddleware, getTeam);

module.exports = router;
