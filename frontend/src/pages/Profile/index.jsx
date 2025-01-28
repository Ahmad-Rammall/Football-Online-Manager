import React, { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";
import useAsync from "../../../hooks/useAsync";
import { teamDataSource } from "../../core/api/team";
import Modal from "../../components/Modal";
import { marketDataSource } from "../../core/api/market";

function Profile() {
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [price, setPrice] = useState(0);

  const handleSell = (player) => {
    setSelectedPlayer(player);
    setOpenModal(true);
  };

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
    callOnMount: true,
  });

  const sellPlayer = useAsync({
    fn: marketDataSource.sellPlayer,
    onSuccess: () => {
      console.log("Player Sold");
    },
    onError: () => {
      console.log(sellPlayer?.error);
    },
  });

  return (
    <>
      <Modal
        title={`Sell ${selectedPlayer?.name}`}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        btnText={"Sell"}
        withInput={true}
        inputLabel={"Price"}
        onSubmit={() => {
          if (price) {
            sellPlayer.main({
              playerId: selectedPlayer?._id,
              askingPrice: price,
            });
          }
        }}
        onInputChange={(e) => setPrice(e.target.value)}
      />
      <div className="profileWrapper">
        {team && (
          <>
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
                ? players.map((player) => (
                    <PlayerCard player={player} handleSell={handleSell} />
                  ))
                : "No Players Yet"}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
