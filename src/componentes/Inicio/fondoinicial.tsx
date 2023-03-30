import React from "react";
import { Button, Box } from "@mui/material";
import fondo from "../../assets/svg/fondo.png";

export default function Dashboard() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={fondo} alt="Logo" width="400" height="550" />
      </Box>
    </Box>
  );
}
