import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useAsync from "../../../hooks/useAsync";
import { marketDataSource } from "../../core/api/market";
import COLORS from "../../constants/COLORS";
import { colors } from "@mui/material";

function Market() {
  const [players, setPlayers] = useState([]);
  const getAllMarketPlayers = useAsync({
    fn: marketDataSource.getMarketPlayers,
    onSuccess: () => {
      console.log(getAllMarketPlayers.result);
      setPlayers(getAllMarketPlayers.result.data);
    },
    onError: () => {
      console.log("Error");
    },
    callOnMount: true,
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
            onClick={() => console.log(params.row)}
            style={{
              padding: "5px 10px",
              backgroundColor: COLORS.primaryBlue,
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Buy
          </button>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
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
  );
}

export default Market;
