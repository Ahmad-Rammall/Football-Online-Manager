import React, { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";
import useAsync from "../../../hooks/useAsync";
import { teamDataSource } from "../../core/api/team";

function Profile() {
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);
  const getMyTeam = useAsync({
    fn: teamDataSource.getMyTeam,
    onSuccess: () => {
      console.log(getMyTeam?.result?.data);

      setTeam(getMyTeam?.result?.data?.team);
      setPlayers(getMyTeam?.result?.data?.players);
    },
    onError: () => {
      console.log(getMyTeam?.error);
    },
    // callOnMount: true,
  });

  useEffect(() => {
    getMyTeam.main();
  }, []);

  return (
    <div className="profileWrapper">
      {team && (
        <>
          {" "}
          <div className="topContainer">
            <div className="teamName">
              {team?.teamName}
              <div className="editIcon">
                <EditIcon />
              </div>
            </div>
            <div className="budget">Budget : ${team?.budget}</div>
          </div>
          <div className="playersContainer">
            {players?.length > 0
              ? players.map((player) => <PlayerCard player={player} />)
              : "No Players Yet"}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
