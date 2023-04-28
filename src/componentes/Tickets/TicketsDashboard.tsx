import {Edit as EditIcon,Add as AddIcon,Delete as DeleteIcon,} from "@mui/icons-material";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import {Box,Breadcrumbs,Button,Card,CardContent,Grid,IconButton,Link,Tooltip,Typography,} from "@mui/material";
import React, { useEffect, useState } from "react";
import MUIXDataGrid from "../Grid/MUIXDataGrid";
// import { Snackbar, Alert, AlertProps, AlertTitle } from "@mui/material";
//import Swal from "sweetalert2";

import Bajo from "../../assets/svg/Bajo.png";
import Media from "../../assets/svg/Media.png";
import Alta from "../../assets/svg/Alta.png";

import { EditDialogTicket } from "../Tickets/Dialog/EditTicket";
import { NewDialogTicket } from "../Tickets/Dialog/NewTicket";
// import { bgcolor } from "@mui/system";

// estructura que se va a llenar con la informacion que regresa el endpoint
// tiene que tener el mismo nombre que regresa el endpoint
export interface TicketsInterface {
  Id: string;
  Nombre: string;
  Path: string;
  EstaActivo: number;
  estatusLabel: string;
}

//componente de sweetalert2 para el uso de los mensajes de alertas
// const Toast = Swal.mixin({
// 	toast: true,
// 	position: "top-end",
// 	showConfirmButton: false,
// 	timer: 4000,
// 	timerProgressBar: false,
// 	didOpen: (toast) => {
// 		toast.addEventListener("mouseenter", Swal.stopTimer);
// 		toast.addEventListener("mouseleave", Swal.resumeTimer);
// 	},
// });

export default function TicketsDashBoard() {
  // const navigate = useNavigate();
  // Set columns and rows for DataGrid
  const columns = [
    // primer columna del grid donde ponemos los botones de editar y eliminar
    {
      field: "acciones",
      headerName: "",
      width: 90,
      headerAlign: "center",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Actualiza Ticket " + cellValues.row.Nombre}>
              <IconButton
                color="primary"
                onClick={(event) => {
                  handleEditBtnClick(event, cellValues);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Cierra Ticket " + cellValues.row.Nombre}>
              <IconButton
                color="error"
                onClick={(event) => {
                  handleDeleteBtnClick(event, cellValues);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    // segunda columna donde se mostrara el nombre
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 400,
      hideable: false,
      headerAlign: "center",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "Path",
      headerName: "Path",
      width: 350,
      hideable: false,
      headerAlign: "center",
    },
    // cuarta columna donde se mostrara si esta activo o no
    {
      field: "estatusLabel",
      headerName: "Estatus",
      width: 100,
      headerAlign: "center",
    },
  ];
  const [rows, setRows] = useState([]);

  // Set Edit App Dialog vars and functions
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogTicket, setEditDialogApp] = useState<TicketsInterface>();
  const handleEditDialogOpen = () => setEditDialogOpen(true);
  const handleEditDialogClose = (changed: boolean) => {
    if (changed === true) {
      // Toast.fire({
      //     icon: "success",
      //     title: "Aplicación actualizada exitosamente",
      // 	//background: '#2e7d32',
      // 	//color: '#fff',
      // });
      getAllApps();
    }
    setEditDialogOpen(false);
  };
  const handleEditBtnClick = (event: any, cellValues: any) => {
    setEditDialogApp(cellValues);
    handleEditDialogOpen();
  };

  // Set New App dialog vars and functions
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const handleNewDialogOpen = () => setNewDialogOpen(true);
  const handleNewDialogClose = (changed: boolean) => {
    if (changed === true) {
      // Toast.fire({
      // 	icon: "success",
      // 	title: "Aplicación Creada Exitosamente",
      // 	//background: '#2e7d32',
      // 	//color: '#fff',
      // });
      getAllApps();
    }
    setNewDialogOpen(false);
  };
  const handleNewBtnClick = (event: any) => {
    handleNewDialogOpen();
  };

  // Handle delete App
  const handleDeleteBtnClick = (event: any, cellValues: any) => {
  
  };

  // aqui es el consumo del endpoint para obtener el listado de app de la base de datos
  const getAllApps = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_BACK+"/api/apps",
      headers: {
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("jwtToken") || "",
        //Authorization: token ,
      },
    })
      // aqui se recibe lo del endpoint en response
      .then(function (response) {
        const rows = response.data.data.map((row: any) => {
          const Id = row.Id;
          const Nombre = row.Nombre;
          const Path = row.Path;
          const EstaActivo = row.EstaActivo;
          const estatusLabel = row.EstaActivo ? "Activo" : "Inactivo";
          const rowTemp = { estatusLabel: estatusLabel, ...row };
          return rowTemp;
        });
        setRows(rows);
      })
      .catch(function (error) {
        // Swal.fire({
        // 	icon: "error",
        // 	title: "Mensaje",
        // 	text:
        // 		"(" +
        // 		error.response.status +
        // 		") " +
        // 		error.response.data.message,
        // }).then((r) => navigate("/config"));
      });
  };

  // esto es solo para que se ejecute la rutina de obtieneaplicaciones cuando cargue la pagina
  useEffect(() => {
    getAllApps();
  }, []);

  return (
    // contenedor principal
    <Grid container sx={{ top:'9vh', position:'absolute', fontFamily: "MontserratSemiBold" }}>
      {/* grid de Breadcrumbs */}
      <Grid item xs={12} sx={{top:'-2vh', position:'absolute',fontFamily: "MontserratSemiBold" }}>
        {/* este componente es para armar la ruta que se muestra arriba y poder navegar hacia atras */}
        {/* ejemplo inicio/configuracion/catalogos/marca */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Inicio
          </Link>
          {/* <Link underline="hover" color="inherit" href="/addapp">Tickets</Link> */}
          <Typography color="text.primary">Tickets</Typography>
        </Breadcrumbs>
      </Grid>

      {/* la verdad este grid aun no entiendo que es o que funcion tiene */}
      <Grid
        container
        justifyContent={"center"}
        sx={{ fontFamily: "MontserratSemiBold"}}
      >
        <Grid item xs={12} md={10} mt={2} >
          {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
          <Card sx={{ p: 0, boxShadow: 8, height:'86vh' }}>
            <Grid
              container
              justifyContent={"center"}
              sx={{ fontFamily: "MontserratSemiBold" }}
            >
              <Grid item xs={3}>
                <Card sx={{ bgcolor: "#a6cda2", width: "225px" }}>
                  <img src={Bajo} alt="Logo" width="225" height="100" />
                  <Typography
                    sx={{
                      color: "#ggg",
                      fontSize: "150%",
                      textAlign: "center",
                    }}
                  >
                    500
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ bgcolor: "#fdffbf", width: "225px" }}>
                  <img src={Media} alt="Logo" width="225" height="100" />
                  <Typography
                    sx={{
                      color: "#ggg",
                      fontSize: "150%",
                      textAlign: "center",
                    }}
                  >
                    1500
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ bgcolor: "#ff8080", width: "225px" }}>
                  <img src={Alta} alt="Logo" width="225" height="100" />
                  <Typography
                    sx={{
                      color: "#ggg",
                      fontSize: "150%",
                      textAlign: "center",
                    }}
                  >
                    100
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={3}>
                <Card sx={{ bgcolor: "gray", width: "225px" }}>
                  {/* <img src={Alta} alt="Logo" width="225" height="100" /> */}
                  <Typography
                    sx={{
                      color: "#ggg",
                      fontSize: "150%",
                      textAlign: "center",
                    }}
                  >
                    grafica de pastel
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <CardContent
              sx={{ fontFamily: "MontserratBold", bgcolor: "" }}
            >
              {/* aqui es el cardcontent que es el contenido del card,y ponemos primero un box y estamos dibujando el boton para agregar un nuevo registro */}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={(event) => handleNewBtnClick(event)}
                  sx={{ fontFamily: "MontserratBold", mb: 3 }}
                  startIcon={<AddIcon />}
                >
                  Nuevo
                </Button>
              </Box>
              {/* aqui se asigna el id unico que tiene que tener cada renglon, asi que asignamos el campo ID que se obtiene del endpoint */}
              <MUIXDataGrid
                id={(row: any) => row.Id}
                columns={columns}
                rows={rows}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {newDialogOpen ? (
        <NewDialogTicket
          NewDialogTicketOpen={newDialogOpen}
          handleNewDialogTicketClose={handleNewDialogClose}
        />
      ) : null}

      {editDialogOpen ? (
        <EditDialogTicket
          EditDialogTicketOpen={editDialogOpen}
          handleEditDialogTicketClose={handleEditDialogClose}
          idTicket={editDialogTicket}
        />
      ) : null}
    </Grid>
  );
}
