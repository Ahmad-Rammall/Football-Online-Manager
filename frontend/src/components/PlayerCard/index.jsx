import React from "react";
import Button from "@mui/material/Button";
import "./index.css"

function PlayerCard({ player }) {
  return (
    <div className="playerCardContainer">
      <div className="playerName">{player?.name}</div>
      <div>{player?.position?.name}</div>
      <div>${player?.baseValue}</div>
      <Button variant="outlined" color="error">
        Sell
      </Button>
    </div>
  );
}

export default PlayerCard;
