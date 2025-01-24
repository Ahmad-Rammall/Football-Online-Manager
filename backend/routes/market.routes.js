const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getMarketPlayers,
  buyPlayer,
  sellPlayer,
} = require("../controllers/market.controller");

router.get("/", authMiddleware, getMarketPlayers);
router.post("/buy-player", authMiddleware, buyPlayer);
router.post("/sell-player", authMiddleware, sellPlayer);

module.exports = router;
