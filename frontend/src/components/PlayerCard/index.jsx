import React from "react";
import Button from "@mui/material/Button";
import "./index.css"

function PlayerCard({ player }) {
  return (
    <div className="playerCardContainer">
      <div className="playerName">{player?.name}messi</div>
      <div>{player?.position}attacker</div>
      <div>${player?.baseValue}100000</div>
      <Button variant="outlined" color="error">
        Sell
      </Button>
    </div>
  );
}

export default PlayerCard;
