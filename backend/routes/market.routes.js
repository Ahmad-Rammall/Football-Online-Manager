const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getMarketPlayers,
  buyPlayer,
  sellPlayer,
  removePlayerFromMarket
} = require("../controllers/market.controller");

router.get("/", authMiddleware, getMarketPlayers);
router.post("/buy-player", authMiddleware, buyPlayer);
router.post("/sell-player", authMiddleware, sellPlayer);
router.put("/return-player", authMiddleware, removePlayerFromMarket);

module.exports = router;
