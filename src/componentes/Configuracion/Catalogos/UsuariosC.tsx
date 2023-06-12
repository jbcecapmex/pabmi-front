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
 


export default function UsuariosC() { 

  const [Dependencia, setDependencia] = React.useState('');
  const handleChange1 = (event: SelectChangeEvent) => {
    setDependencia(event.target.value as string);
  };

  const [Puesto, setPuesto] = React.useState('');
  const handleChange3 = (event: SelectChangeEvent) => {
    setPuesto(event.target.value as string);
  };

  const [Tipousuario, setTipousuario] = React.useState('');
  const handleChange4 = (event: SelectChangeEvent) => {
    setTipousuario (event.target.value as string);
  };

  
  const [Perfil, setPerfil] = React.useState('');
  const handleChange5 = (event: SelectChangeEvent) => {
    setPerfil (event.target.value as string);
  };

  const [Rol, setRol] = React.useState('');
  const handleChange6 = (event: SelectChangeEvent) => {
    setRol(event.target.value as string);
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
      field: "nombrecorto",
      headerName: "Nombre Corto",
      width: 360,
      hideable: false,
      headerAlign: "center",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "uuiddependencia",
      headerName: "Dependencia",
      width: 400,
      hideable: false,
      headerAlign: "center",
    },
    // cuarta columna donde se mostrara si esta activo o no
    {
      field: "Puesto",
      headerName: "Puesto",
      width: 400,
      headerAlign: "center",
    },
    // quinta columna donde se mostrara si esta activo o no
    {
      field: "TipodeUsuario",
      headerName: "Tipo de Usuario",
      width: 400,
      headerAlign: "center",
    },

    {
      field: "Perfil",
      headerName: "Perfil",
      width: 400,
      headerAlign: "center",
    },
    {
      field: "Rol",
      headerName: "Rol",
      width: 400,
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
          Usuario
          </Link>
          <Link underline="hover" color="inherit">
          Usuario
          </Link>
          <Typography color="text.primary"> Catálogo de Usuarios </Typography>
        </Breadcrumbs>
      </Grid> 

      <Grid container justifyContent={"center"} item xs={12} paddingLeft={2} paddingTop={2}>
      <Grid item xs={12} md={12}  >
      <Card sx={{ p: 1, boxShadow: 4 }}>
      <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold"}} />
      <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}> Catálogo de Usuarios</Typography>  
      <CardContent>
      <Box display="flex" justifyContent="flex-end">
      <Grid sx={{display: "flex", alignItems: "right", justifyContent: "right", paddingBottom:"2%", paddingRight:"1%"}}>
                    <Button
                      // onClick={(event) => handleNewBtnClick(event)}
                      onClick={handleOpen}
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
                       onClick={() => navigate(-1)}
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
          <Box sx={style} display="flow">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box> 
                <Typography  variant="h5" sx={{ padding:"2%"}}> Catálogo de Usuarios </Typography>  
              </Box>
		        </Grid>

            <Grid item xs={12}>
            <Box    
              component="form"
              sx={{
              '& > :not(style)': { m: 1.3, width: '25%' },   }}
              noValidate
              autoComplete="off"
		          display="flex">

                <TextField
                id="uuidticentral" 
                label="Central"
                size="small"
                variant="outlined" />
            </Box>
            </Grid>

            <Grid item xs={6}>
            <Box    
              component="form"
              sx={{
              '& > :not(style)': { m: 1.3, width: '95%' },   }}
              noValidate
              autoComplete="off"
		          display="flex">
                <TextField
                id="nombrecorto" 
                label="Nombre Corto"
                size="small"
                variant="outlined" />
                </Box>
            </Grid>

            <Grid item xs={6}>
            <Box    
              component="form"
              sx={{
              '& > :not(style)': { m: 1.3, width: '95%' },   }}
              noValidate
              autoComplete="off"
		          display="flex">

              <Select
              labelId="uuiddependencia"
              id="Dependencia"
              value={Dependencia}
              label="Dependencia"
              size="small"
              displayEmpty
              onChange={handleChange1}
            >
              
                <MenuItem value="" >
                Dependencia
                </MenuItem>
                <MenuItem value={10}> Secretería General de Gobierno </MenuItem>
                <MenuItem value={20}> Secretaría del Trabajo  </MenuItem>
                <MenuItem value={30}> Secretaría de Administración  </MenuItem>
              </Select>
            </Box>
            </Grid>

            <Grid item xs={6}>
            <Box    
              component="form"
              sx={{
              '& > :not(style)': { m: 1.3, width: '95%' },   }}
              noValidate
              autoComplete="off"
		          display="flex">

              <Select
              labelId="Puesto"
              id="Puesto"
              value={Puesto}
              label="Puesto"
              size="small"
              displayEmpty
              onChange={handleChange3}
            >
                <MenuItem value="">
                Puesto
                </MenuItem>
                <MenuItem value={10}>Desarrollador</MenuItem>
                <MenuItem value={20}> Administración </MenuItem>
                <MenuItem value={30}> Seguridad </MenuItem>
              </Select>
            </Box>
            </Grid>
            
            <Grid item xs={6}>
            <Box    
              component="form"
              sx={{
              '& > :not(style)': { m: 1.3, width: '95%' },   }}
              noValidate
              autoComplete="off"
		          display="flex">

              <Select
              labelId="Tipousuario"
              id="Tipousuario"
              value={Tipousuario}
              label="Tipousuario"
              size="small"
              displayEmpty
              onChange={handleChange4}
            >
                <MenuItem value="">
                Tipo de Usuario
                </MenuItem>
                <MenuItem value={10}>Administracion </MenuItem>
                <MenuItem value={20}> Analista </MenuItem>
                <MenuItem value={30}> Desarrollo </MenuItem>
              </Select>
            </Box>
            </Grid>

            <Grid item xs={6}>
            <Box    
              component="form"
              sx={{
              '& > :not(style)': { m: 1.3, width: '95%' },   }}
              noValidate
              autoComplete="off"
		          display="flex">

              <Select
              labelId="Perfil"
              id="Perfil"
              value={Perfil}
              label="Perfil"
              size="small"
              displayEmpty
              onChange={handleChange5}
            >
                <MenuItem value="">
                Perfil
                </MenuItem>
                <MenuItem value={10}>Perfil </MenuItem>
                <MenuItem value={20}>Perfil</MenuItem>
                <MenuItem value={30}>Perfil</MenuItem>
              </Select>
            </Box>
            </Grid>

            <Grid item xs={6}>
            <Box    
              component="form"
              sx={{
              '& > :not(style)': { m: 1.3, width: '95%' },   }}
              noValidate
              autoComplete="off"
		          display="flex">

              <Select
              labelId="Rol"
              id="Rol"
              value={Rol}
              label="Rol"
              size="small"
              displayEmpty
              onChange={handleChange6}
            >
                <MenuItem value="">
                 Rol
                </MenuItem>
                <MenuItem value={10}>Rol</MenuItem>
                <MenuItem value={20}>Rol</MenuItem>
                <MenuItem value={30}>Rol</MenuItem>
              </Select>
            </Box>
            </Grid>


            <Grid item xs={12}>
            <Box  maxWidth="100%"  paddingTop={2} paddingBottom={2} display="flex" justifyContent="end" >
              <Button variant="contained"  
             sx={{margin:"1%",
             color:"white",
             "&:hover":{
               color:"#15212f",
               },
              }} 
               > Guardar </Button>
              <Button  
                onClick={handleClose}
                variant="contained" 
                color="secondary"
                sx={{margin:"1%",
                color:"white",
                "&:hover":{
                color:"#15212f",
                },
                }}>  Cancelar </Button>
            </Box>
            </Grid>

            </Grid>

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