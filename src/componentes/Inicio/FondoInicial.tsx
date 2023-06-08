import React from "react";
import { Button, Box } from "@mui/material";
import fondo from "../../assets/svg/fondo.png";

export default function Dashboard() {
  return (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <img src={fondo} alt="Logo" width="400" height="550" />
      </Box>
  );
}
