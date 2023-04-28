import React from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
//import Swal from "sweetalert2";
import { borders } from "@mui/system";

//solo para efectos de desarrollo, ya integrado al login, esto se tiene que comentar o quitar
//import {token} from "../CatApps";

export interface NewDialogProps {
  newDialogOpen: boolean;
  handleNewDialogClose: Function;
  cat: number;
  titulo: string;
}

export const NewDialog = (props: NewDialogProps) => {
  const [descripcion, setDescripcion] = useState("");
  const [path, setPath] = useState("");
  const [idusuariomodifica, setIDUsuarioModifica] = useState("");

  const handleStoreBtn = () => {
    if (descripcion === "" || path === "") {
      // Swal.fire({
      // 	icon: "error",
      // 	title: "Mensaje",
      // 	text: "Completa todos los campos para continuar",
      // });
    } else {
      setIDUsuarioModifica("c18fc135-3a89-11ed-aed0-040300000000");
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual
      const data = {
        Descripcion: descripcion,
        Path: path,
        IdUsuarioModificador: "c18fc135-3a89-11ed-aed0-040300000000",
      };
      axios({
        method: "post",
        url: process.env.REACT_APP_APPLICATION_BACK+"/api/create-app",
        headers: {
          "Content-Type": "application/json",
          // Authorization: localStorage.getItem("jwtToken") || "",
          //Authorization: token ,
        },
        data: data,
      })
        .then(function (response) {
          props.handleNewDialogClose(true);
        })
        .catch(function (error) {
          // Swal.fire({
          // 	icon: "error",
          // 	title: "Mensaje",
          // 	text:
          // 		"(" +
          // 		error.response.status +
          // 		") " +
          // 		error.response.data.msg,
          // });
        });
    }
  };

  return (
    <Dialog
      open={props.newDialogOpen}
      onClose={() => props.handleNewDialogClose()}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      {/* pantalla modal, para agregar  nueva */}
      <DialogTitle id="edit-dialog-title">
        {props.titulo}
        {/* <ButtonGroup variant="outlined" aria-label="outlined button group">
        </ButtonGroup> */}
        <Box sx={{position: "absolute", right: 8, top: 8,}}>
          <Grid sx={{display: "flex",alignItems: "right",justifyContent: "right", padding:"2%"}}>
            <Button
              onClick={() => handleStoreBtn()}
              sx={{ width: "50%", borderRadius: "0",borderTopLeftRadius: "5px",borderBottomLeftRadius: "5px",}} variant="contained"
            >
              <Typography
                sx={{color: "#ffffff",fontFamily: "Roboto, sans-serif",fontSize: "100%",}}>
                Guardar
              </Typography>
            </Button>
            <Button
              onClick={() => props.handleNewDialogClose()}
              sx={{color: "#616161",fontFamily: "Roboto, sans-serif",width: "50%", 
                        borderRadius: "0",borderTopRightRadius: "5px",borderBottomRightRadius: "5px",}} color="secondary" variant="contained"
            >
              <Typography
                sx={{
                  color: "#ffffff",fontFamily: "Roboto, sans-serif",fontSize: "100%",}}>
                Cancelar
              </Typography>
            </Button>
          </Grid>

          {/* <CloseIcon /> */}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {/* campo de descripcion */}
        <Grid container spacing={2}>
          <TextField
            autoFocus
            margin="dense"
            id="descripcion"
            label="Descripción"
            type="text"
            fullWidth
            variant="standard"
            size="small" 
            value={descripcion}
            required
            onChange={(v) => setDescripcion(v.target.value)}
          />
          {/* <Grid sx={{backgroundColor:"red"}} item xs={12} md={6}>
					</Grid> */}
        </Grid>
      </DialogContent>
      <DialogActions>
        {/* <Button color="error" onClick={() => props.handleNewDialogClose()}>
          Cancelar
        </Button>
        <Button onClick={() => handleStoreBtn()}> Crear</Button> */}
      </DialogActions>
    </Dialog>
  );
};
