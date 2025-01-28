const express = require("express");
const { getTeam, updateTeamName } = require("../controllers/team.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", authMiddleware, getTeam);
router.put("/", authMiddleware, updateTeamName)

module.exports = router;
