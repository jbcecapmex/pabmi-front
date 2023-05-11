import React from "react";
import { Button, Box, Grid, Link, Breadcrumbs, Typography, Tooltip, IconButton,  Card, CardHeader, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import MUIXDataGrid from "../../Grid/MUIXDataGrid";


export interface SecretariaInterface {
  uuid: string;
  descripcion: string;
  estado: boolean;
  estatusLabel: string;
}

export default function Principal() {

  const navigate = useNavigate();

  const columns = [
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
           <IconButton color="primary" 
          //  onClick={(event) => {handleEditBtnClick(event, cellValues);}}
           >
                <EditIcon />
              </IconButton>
           </Tooltip>
           <Tooltip title={"Eliminar" + cellValues.row.Nombre}>
              <IconButton color="error"
              //  onClick={(event) => {handleDeleteBtnClick(event, cellValues);}}
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
      width: 130,
      hideable: false,
      headerAlign: "center",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 130,
      hideable: false,
      headerAlign: "center",
    },
    // cuarta columna donde se mostrara si esta activo o no
    {
      field: "CreadoPor",
      headerName: "Creado por",
      width: 130,
      headerAlign: "center",
    },
    // quinta columna donde se mostrara si esta activo o no
    {
      field: "ModificadoPor",
      headerName: "Modificado por",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "EliminadoPor",
      headerName: "Eliminado por",
      width: 130,
      headerAlign: "center",
    },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 130,
      headerAlign: "center",
    },
  ];
 
  const [rows, setRows] = useState([]);
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
    };


    const getAllApps = () => {
      axios ({
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

    useEffect(() => {
      getAllApps();
    }, []);
 
  return (
    <Grid container >
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
            titulo
          </Link>
          <Typography color="text.primary">Catálogo de titulo</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid container justifyContent={"center"} item xs={12} paddingLeft={3}>
      <Grid item xs={12} md={12} mt={2}>
      <Card  sx={{ p: 1, boxShadow: 2 }}>
      <CardHeader  sx={{ position: "absolute"}}>
      <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}> Catálogo de titulo </Typography>  
      </CardHeader>
      <CardContent>
      <Box display="flex" justifyContent="flex-end">
      <Grid sx={{display: "flex", alignItems: "right", justifyContent: "right", paddingBottom:"2%", paddingRight:"1%"}}>
      <Button
       // onClick={(event) => handleNewBtnClick(event)}
        variant="contained"
        sx={{margin:"1%"}} >
        <Typography
        sx={{color: "#FFFFFF",
        "&:hover":{
          color:"#15212f",
          },
        fontFamily: "MontserratRegular, sans-serif",
        fontSize: "100%",}}>
        Agregar
        </Typography>
        </Button>
        <Button 
        // onClick={() => regresa()} 
        // sx={{color: "#616161",fontFamily: "Roboto, sans-serif",width: "50%",backgroundColor: "#3988DA",border: "1px solid #3988DA", borderRadius: "0",borderTopRightRadius: "5px",borderBottomRightRadius: "5px",}}
        color="secondary"
        sx={{margin:"1%"}}
        variant="contained">
        <Typography
        sx={{color: "#ffffff",
        "&:hover":{
          color:"#15212f",
          },
        fontFamily: "MontserratRegular, sans-serif",
        fontSize: "100%",}}>
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
    </Grid>
  );
}
