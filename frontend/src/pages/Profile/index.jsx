import React, { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";
import useAsync from "../../../hooks/useAsync";
import { teamDataSource } from "../../core/api/team";
import Modal from "../../components/Modal";
import { marketDataSource } from "../../core/api/market";
import notify from "../../../notify/notify";

function Profile() {
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);

  const [openNameModal, setOpenNameModal] = useState(false);
  const [teamName, setTeamName] = useState("");

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [price, setPrice] = useState(0);

  const handleSell = (player) => {
    setSelectedPlayer(player);
    setOpenModal(true);
  };

  const removeFromMarket = (player) => {
    setSelectedPlayer(player);
    setRemoveModal(true);
  };

  const getMyTeam = useAsync({
    fn: teamDataSource.getMyTeam,
    onSuccess: () => {
      console.log(getMyTeam?.result?.data);

      setTeam(getMyTeam?.result?.data?.team);
      setTeamName(getMyTeam?.result?.data?.team?.teamName);
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
      notify.success("Player Added To Market");
    },
    onError: () => {
      notify.error(sellPlayer?.error);
    },
  });

  const returnPlayer = useAsync({
    fn: marketDataSource.returnPlayer,
    onSuccess: () => {
      notify.success("Player Removed From Market");
    },
    onError: () => {
      notify.error(returnPlayer?.error);
    },
  });

  const changeTeamName = useAsync({
    fn: teamDataSource.updateTeamName,
    onSuccess: () => {
      notify.success("Team Name Updated");

      team.teamName = teamName;
      setOpenNameModal(false);
    },
    onError: () => {
      notify.error(changeTeamName?.error);
    },
  });

  return (
    <>
      {/* Team Name Modal */}
      <Modal
        title={`Change Team Name`}
        open={openNameModal}
        handleClose={() => setOpenNameModal(false)}
        btnText={"Change"}
        withInput={true}
        inputLabel={"Team Name"}
        onSubmit={() => {
          if (teamName !== team?.teamName) {
            changeTeamName.main({
              teamName,
            });
          } else {
            setOpenNameModal(false);
          }
        }}
        onInputChange={(e) => setTeamName(e.target.value)}
        inputValue={teamName}
      />

      {/* Sell Player Modal */}
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
        inputValue={price}
      />

      {/* Remove From Market Modal */}
      <Modal
        open={removeModal}
        handleClose={() => setRemoveModal(false)}
        text={`Are you sure you want to remove ${selectedPlayer?.name} from Market?`}
        btnText={"Remove"}
        title={`Remove ${selectedPlayer?.name} from Market`}
        onSubmit={() => returnPlayer.main({ playerId: selectedPlayer?._id })}
      />

      <div className="profileWrapper">
        {team && (
          <>
            <div className="topContainer">
              <div className="teamName">
                {team?.teamName}
                <div
                  className="editIcon"
                  onClick={() => setOpenNameModal(true)}
                >
                  <EditIcon />
                </div>
              </div>
              <div className="budget">Budget : ${team?.budget}</div>
            </div>
            <div className="playersContainer">
              {players?.length > 0
                ? players.map((player) => (
                    <PlayerCard
                      player={player}
                      handleSell={handleSell}
                      removeFromMarket={removeFromMarket}
                    />
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
