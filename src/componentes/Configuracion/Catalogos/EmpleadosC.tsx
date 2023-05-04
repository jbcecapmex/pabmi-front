import React from 'react';
import { Card, CardHeader , Grid, Breadcrumbs, Tooltip, Link, IconButton, Typography, Box, TextField, CardContent, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MUIXDataGrid from '../../Grid/MUIXDataGrid';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  boxShadow: 5,
  p: 2,
};
 


export default function EmpleadosC() { 

  const [Dependencia, setDependencia] = React.useState('');
  const handleChange7 = (event: SelectChangeEvent) => {
    setDependencia(event.target.value as string);
  };

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
      width: 260,
      hideable: false,
      headerAlign: "center",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "apellidopaterno",
      headerName: "Apellido Paterno",
      width: 260,
      hideable: false,
      headerAlign: "center",
    },
    // cuarta columna donde se mostrara si esta activo o no
    {
      field: "apellidomaterno",
      headerName: "Apellido Materno",
      width: 260,
      headerAlign: "center",
    },

    {
      field: "correo",
      headerName: "Correo",
      width: 260,
      headerAlign: "center",
    },

    {
      field: "Dependencia",
      headerName: "Dependencia",
      width: 260,
      headerAlign: "center",
    },
 
  ];

  const [rows, setRows] = useState([]);


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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 

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
          Empleados
          </Link>
          <Typography color="text.primary"> Catálogo de Empleados </Typography>
        </Breadcrumbs>
      </Grid> 

      <Grid container justifyContent={"center"} item xs={12} paddingLeft={2} paddingTop={2}>
      <Grid item xs={12} md={12}  >
      <Card sx={{ p: 1, boxShadow: 4 }}>
      <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold"}} />
      <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}> Catálogo de Empleados </Typography>  
      <CardContent>
      <Box display="flex" justifyContent="flex-end">
      <Grid sx={{display: "flex", alignItems: "right", justifyContent: "right", paddingBottom:"2%", paddingRight:"1%"}}>
                    <Button
                      // onClick={(event) => handleNewBtnClick(event)}
                      onClick={handleOpen}
                      variant="contained"
                      sx={{margin:"1%"}}
                      startIcon={<AddIcon sx={{color:"#FFFFFF"}} /> }>
                      <Typography
                        sx={{color: "#FFFFFF",fontFamily: "MontserratRegular, sans-serif",fontSize: "100%",}}>
                        Agregar
                      </Typography>
                    </Button>
                    <Button 
                       onClick={() => navigate(-1)}
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



      <Grid >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
        <Box> 
        <Typography  variant="h5" sx={{ padding:"2%"}}> Catálogo de Empleados </Typography>  
        </Box>
        
          <Box    
          component="form"
          sx={{
          '& > :not(style)': { m: 1.3, width: '15%' },   }}
          noValidate
          autoComplete="off">

          <TextField
            id="cve" 
            label="cve"
            variant="outlined"
            size="small"  />

          </Box>

          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '47%' },
      }}
      noValidate
      autoComplete="off"
    >
     
      <TextField
       id="nombre" 
       label="Nombre"
       variant="outlined"
       size="small"  />

      <TextField
       id="apellidopaterno" 
       label="Apellido Paterno"
       variant="outlined" 
       size="small" />

    </Box>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '47%' },
      }}
      noValidate
      autoComplete="off"
    >

      <TextField
       id="apellidomaterno" 
       label="Apellido Materno" 
       variant="outlined"
       size="small"  />

      <TextField
       id="correo" 
       label="correo"
       variant="outlined"
       size="small"  />
       
    </Box>


    <Grid item xs={6}>
            <Box    
              component="form"
              sx={{
              '& > :not(style)': { m: 1.3, width: '94%' },   }}
              noValidate
              autoComplete="off"
		          display="flex">

              <Select
              labelId="Dependencia"
              id="Dependencia"
              value={Dependencia}
              label="Dependencia"
              size="small"
              displayEmpty
              onChange={handleChange7}
            >
                <MenuItem value="">
                Dependencia
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Box>
            </Grid>


    <Box  maxWidth="100%"  paddingTop={2} paddingBottom={2} display="flex" justifyContent="end" >
      <Button variant="contained" sx={{margin:"1%"}} > Guardar </Button>
      <Button  
      onClick={handleClose}
      variant="contained" 
      color="secondary"
      sx={{margin:"1%"}}>  Cancelar </Button>
    </Box>
        </Box>
      </Modal>
       </Grid>


      </CardContent>
      </Card>
      </Grid>
      </Grid>

    </Grid>
  );
}