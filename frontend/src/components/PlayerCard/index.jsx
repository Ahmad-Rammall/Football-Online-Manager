import React from "react";
import Button from "@mui/material/Button";
import "./index.css";

function PlayerCard({ player, handleSell, removeFromMarket }) {
  return (
    <div className="playerCardContainer">
      <div className="playerName">{player?.name}</div>
      <div>{player?.position?.name}</div>
      <div>${player?.baseValue}</div>
      <Button
        variant={player?.onTransferList ? "outlined" : "contained"}
        color="error"
        onClick={() => {
          if (player?.onTransferList) removeFromMarket(player);
          else handleSell(player);
        }}
      >
        {player?.onTransferList ? "Cancel Sell" : "Sell"}
      </Button>
    </div>
  );
}

export default PlayerCard;
