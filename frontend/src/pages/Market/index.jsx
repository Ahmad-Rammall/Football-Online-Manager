import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useAsync from "../../../hooks/useAsync";
import { marketDataSource } from "../../core/api/market";
import COLORS from "../../constants/COLORS";
import Modal from "../../components/Modal/index";
import notify from "../../../notify/notify";
import { useTeam } from "../../core/context/teamContext";

function Market() {
  const { teamId } = useTeam();

  const [players, setPlayers] = useState([]);
  const [isModalOpen, setOpenModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const getAllMarketPlayers = useAsync({
    fn: marketDataSource.getMarketPlayers,
    onSuccess: () => {
      setPlayers(getAllMarketPlayers.result.data);
    },
    onError: () => {
      console.log("Error");
    },
    callOnMount: true,
  });

  const buyPlayer = useAsync({
    fn: marketDataSource.buyPlayer,
    onSuccess: () => {
      notify.success("Player Purchased!");
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player._id !== selectedPlayer._id)
      );

      setOpenModal(false);
    },
    onError: () => {
      console.log(buyPlayer.error);
      notify.error(buyPlayer.error);
    },
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params?.name || "Unknown",
    },
    {
      field: "teamId",
      headerName: "Team",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params?.teamName || "Unknown",
    },
    {
      field: "askingPrice",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              console.log(params.row);

              setSelectedPlayer(params.row);
              setOpenModal(true);
            }}
            style={{
              padding: "5px 10px",
              backgroundColor: COLORS.primaryBlue,
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity:
                localStorage.getItem("currentTeamId") === params.row.teamId._id
                  ? "0.7"
                  : "1",
              cursor:
                localStorage.getItem("currentTeamId") ===
                  params.row.teamId._id ? "not-allowed" : "pointer",
            }}
            disabled={
              localStorage.getItem("currentTeamId") === params.row.teamId._id
            }
          >
            Buy
          </button>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 8 };

  return (
    <>
      <Modal
        open={isModalOpen}
        handleClose={() => setOpenModal(false)}
        text={`Are you sure you want to buy ${selectedPlayer?.name} for $${selectedPlayer?.askingPrice}?`}
        btnText={"Buy"}
        title={`Buy ${selectedPlayer?.name}`}
        onSubmit={() => buyPlayer.main({ playerId: selectedPlayer?._id })}
      />
      <Paper sx={{ height: "100%", width: "100%", padding: 2 }}>
        <DataGrid
          rows={players}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}

export default Market;
