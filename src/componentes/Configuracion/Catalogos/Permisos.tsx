import React from 'react';
import { Card, CardHeader , Grid, Breadcrumbs, Tooltip, Link, IconButton, Typography, Box, TextField, CardContent, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../../Grid/MUIXDataGrid";
 

export interface SecretariaInterface {
  uuid: string;
  descripcion: string;
  estado: boolean;
  estatusLabel: string;
}
 

export default function PermisosC() { 

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

   // esto es solo para que se ejecute la rutina de obtieneaplicaciones cuando cargue la pagina
   useEffect(() => {
    getAllApps();
  }, []);

  return (
    <Grid container sx={{ fontFamily: "MontserratSemiBold" }}>
      <Grid item xs={12} paddingLeft={3}>
      <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/inicio">
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
          <Typography color="text.primary">Catálogo de titulo </Typography>
        </Breadcrumbs>
      </Grid> 
      <Grid container justifyContent={"center"} item xs={12} paddingLeft={3}>
      <Grid item xs={12} paddingRight={3} paddingTop={5}>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1.3, width: '10%' }, 
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
       id="Cve" 
       label="cve"
       variant="outlined" />

    </Box>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1.3, width: '41%' }, 
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
       id="nombre" 
       label="Nombre"
       variant="outlined" />

      <TextField
       id="descripcion" 
       label="Descripción"
       variant="outlined" />

    </Box>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '27%' },
      }}
      noValidate
      autoComplete="off"
    >
     
      <TextField
       id="CreadoPor" 
       label="Creado por"
       variant="outlined" />

      <TextField
       id="ModificadoPor" 
       label="Modificado por" 
       variant="outlined" />
       
       <TextField
       id="Eliminadopor" 
       label="Eliminado por"
       variant="outlined" />

    </Box>


    <Box  maxWidth="85%"  paddingTop={3} paddingBottom={3} display="flex" justifyContent="end" >
      <Button variant="contained"> Guardar </Button>
    </Box>
      </Grid>
      </Grid>

      <Grid container justifyContent={"center"} item xs={10} paddingLeft={3} paddingTop={5}>
      <Grid item xs={12} md={12} mt={2}>
      <Card sx={{ p: 1, boxShadow: 4 }}>
      <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold"}} />
      <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}> Catálogo de titulo </Typography>  
      <CardContent>
      <Box display="flex" justifyContent="flex-end">
      <Grid sx={{display: "flex", alignItems: "right", justifyContent: "right", paddingBottom:"2%", paddingRight:"1%"}}>
                    <Button
                      // onClick={(event) => handleNewBtnClick(event)}
                      variant="contained"
                      sx={{margin:"1%"}}
                      startIcon={<AddIcon sx={{color:"#FFFFFF"}} /> }>
                      <Typography
                        sx={{color: "#FFFFFF",fontFamily: "MontserratRegular, sans-serif",fontSize: "100%",}}>
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
                        sx={{color: "#ffffff",fontFamily: "MontserratRegular, sans-serif",fontSize: "100%",}}>
                        Cancelar
                      </Typography>
                    </Button>
                  </Grid>
      </Box>

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