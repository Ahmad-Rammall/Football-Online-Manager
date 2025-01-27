import React from "react";
import PlayerCard from "../../components/PlayerCard";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";

function Profile() {
  return (
    <div className="profileWrapper">
      <div className="topContainer">
        <div className="teamName">
          Barcelona
          <div className="editIcon">
            <EditIcon />
          </div>
        </div>
        <div className="budget">Budget : $100000</div>
      </div>
      <div className="playersContainer">
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </div>
    </div>
  );
}

export default Profile;
