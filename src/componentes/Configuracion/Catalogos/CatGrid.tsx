import React from "react";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../../Grid/MUIXDataGrid";
import { EditDialog } from "./Dialogs/EditDialog";
import { NewDialog } from "./Dialogs/NewDialog";

import { Snackbar, Alert, AlertProps, AlertTitle } from "@mui/material";


// estructura que se va a llenar con la informacion que regresa el endpoint
// tiene que tener el mismo nombre que regresa el endpoint
export interface SecretariaInterface {
  uuid: string;
  descripcion: string;
  estado: boolean;
  estatusLabel: string;
}

//componente de sweetalert2 para el uso de los mensajes de alertas
// const Toast = Swal.mixin({
// 	toast: true,
// 	position: "top-end",
// 	showConfirmButton: false,
// 	timer: 5000,
// 	timerProgressBar: true,
// 	didOpen: (toast) => {
// 		toast.addEventListener("mouseenter", Swal.stopTimer);
// 		toast.addEventListener("mouseleave", Swal.resumeTimer);
// 	},
// });

export default function CatGrid({
  cat,
  titulo,
  regresa,
}: {
  cat: number;
  titulo: string;
  regresa: Function
}) {
  const navigate = useNavigate();

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
            <Tooltip title={"Editar " + cellValues.row.Nombre}>
              <IconButton color="primary" onClick={(event) => {handleEditBtnClick(event, cellValues);}}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Eliminar" + cellValues.row.Nombre}>
              <IconButton color="error" onClick={(event) => {handleDeleteBtnClick(event, cellValues);}}>
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
      width: 360,
      hideable: false,
      headerAlign: "center",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 400,
      hideable: false,
      headerAlign: "center",
    },
    // cuarta columna donde se mostrara si esta activo o no
    {
      field: "Icono",
      headerName: "Icono",
      width: 84,
      headerAlign: "center",
    },
    // quinta columna donde se mostrara si esta activo o no
    {
      field: "Nivel",
      headerName: "Nivel",
      width: 84,
      headerAlign: "center",
    },
    
  ];
  const [rows, setRows] = useState([]);

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
      // getAllApps();
    }
    setNewDialogOpen(false);
  };
  const handleNewBtnClick = (event: any) => {
    handleNewDialogOpen();
  };

  // Set Edit App Dialog vars and functions
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogAgr, setEditDialogAgr] = useState<SecretariaInterface>();
  const handleEditDialogOpen = () => setEditDialogOpen(true);
  const handleEditDialogClose = (changed: boolean) => {
    if (changed === true) {
      // Toast.fire({
      //     icon: "success",
      //     title: "Aplicación actualizada exitosamente",
      // 	//background: '#2e7d32',
      // 	//color: '#fff',
      // });
      // getAllApps();
    }
    setEditDialogOpen(false);
  };
  const handleEditBtnClick = (event: any, cellValues: any) => {
    setEditDialogAgr(cellValues);
    handleEditDialogOpen();
  };

  // Handle delete 
  const handleDeleteBtnClick = (event: any, cellValues: any) => {
    console.log(cellValues.row.Id);
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
    <Grid container>
      <Grid item xs={12} paddingLeft={3}>
        {/* este componente es para armar la ruta que se muestra arriba y poder navegar hacia atras */}
        {/* ejemplo inicio/configuracion/catalogos/marca */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/Inicio">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/configuracion/catalogos">
            Configuración
          </Link>
          <Link underline="hover" color="inherit" href="/configuracion/catalogos">
            Catálogos
          </Link>
          <Link underline="hover" color="inherit">
            {titulo}
          </Link>
          <Typography color="text.primary">Catálogo de {titulo} </Typography>
        </Breadcrumbs>
      </Grid>


      {/* la verdad este grid aun no entiendo que es o que funcion tiene */}
      {/* <Grid item xs={12}> */}
        <Grid container justifyContent={"center"} item xs={12} >
          <Grid item xs={12} md={12} mt={2}  >
            {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
            <Card sx={{ p: 3, boxShadow: 8 }}>
              <CardHeader sx={{ position: "absolute", fontFamily: "MontserratBold" }} />
              <Typography  variant="h4">Catálogo de {titulo}</Typography>              
              <CardContent>
                {/* aqui es el cardcontent que es el contenido del card,y ponemos primero un box y estamos dibujando el boton para agregar un nuevo registro */}
                <Box display="flex" justifyContent="flex-end">
                  <Grid sx={{display: "flex", alignItems: "right", justifyContent: "right", p:3}}>
                    <Button
                      onClick={(event) => handleNewBtnClick(event)}
                      sx={{ width: "50%", borderTopLeftRadius: "5px",borderBottomLeftRadius: "5px"   }} variant="contained"
                        startIcon={<AddIcon sx={{color:"#FFFFFF"}} /> }>
                      <Typography
                        sx={{color: "#FFFFFF",fontFamily: "Roboto, sans-serif",fontSize: "100%",}}>
                        Agregar
                      </Typography>
                    </Button>
                    <Button onClick={() => regresa()} sx={{ fontFamily: "Roboto, sans-serif",width: "50%", borderTopRightRadius: "5px",borderBottomRightRadius: "5px",}}  color="secondary" variant="contained">
                      <Typography
                        sx={{color: "#ffffff",fontFamily: "Roboto, sans-serif",fontSize: "100%",}}>
                        Cancelar
                      </Typography>
                    </Button>
                  </Grid>
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
      {/* </Grid> */}

      {/* Opcion de Agregar */}
      {newDialogOpen ? (
        <NewDialog
          newDialogOpen={newDialogOpen}
          handleNewDialogClose={handleNewDialogClose}
          cat={cat}
          titulo={titulo}

        />
      ) : null}
      {/* opcion de Editar */}
      {editDialogOpen ? (
        <EditDialog
          editDialogOpen={editDialogOpen}
          handleEditDialogClose={handleEditDialogClose}
          cat={cat}
          titulo={titulo}
          app={editDialogAgr}
        />
      ) : null}
    </Grid>
  );
}


