import React from 'react';
import { Card, CardHeader , Grid, Breadcrumbs, Tooltip, Link, IconButton, Typography, Box, TextField, CardContent, Button, Input } from '@mui/material';
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
import FormControl from '@mui/material/FormControl';
import Swal from "sweetalert2";
import {catalogoSave, catalogoDelete, catalogoUpdate} from "../../../services/CatalogoServices";

// Estilos para la ventana Modal
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

export interface NotificacionesInterface {
  uuid:                string;
  Encabezado:          string;            
  Descripcion:         string;
  creadopor:          string;
  modificadopor:      string;
  eliminadopor:       string; 
}

// inicia el componente
export default function Notificaciones() { 

  // Crear las interfaces que se mandaran en los endpoints
  const [uuid, setuuid]                   = useState("");
  const [Encabezado, setEncabezado]       = useState("");
	const [Descripcion, setDescripcion]     = useState("");
  const [creadopor, setCreadoPor]         = useState("");
  const [modificadopor, setModificadoPor] = useState("");
  const [eliminadopor, setEliminadoPor]   = useState("");  


    // Abrir modal
    const [open, setOpen]               = React.useState(false);
    const handleOpen = ()   => setOpen(true);
    const handleClose = ()  => setOpen(false);

  // Guardar un registro nuevo.
  const handleSave = () => {
    if (Encabezado === "" || Descripcion === ""){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        encabezado            : Encabezado,
        descripcion           : Descripcion,
        creadopor             : localStorage.getItem("IdUsuario"),
        eliminadopor          : eliminadopor,
        visto                 :0
      };
      const url = "/catalogos/guardanotificaciones";
      catalogoSave(data,url).then((response) =>{
        setOpen(false);
        getAllNotificaciones();
      })
    }
  };
  // Handle delete
  const handleDelete = (event: any, cellValues: any) => {
    const data = cellValues.row.uuid;
    const descripcion = cellValues.row.Descripcion;   
    const url = "/catalogos/eliminanotificaciones";
    catalogoDelete(data,url,descripcion).then((response) =>{
      setOpen(false);
      getAllNotificaciones();
    })
  };
  // Handle update
  const handleUpdate = () => {
    if (Encabezado === "" || Descripcion === ""){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      
      const data = {
        uuid              : uuid,
        Encabezado        : Encabezado,
        Descripcion       : Descripcion,
        creadopor         : creadopor,
        modificadopor     : localStorage.getItem("IdUsuario"),
        eliminadopor      : eliminadopor,
      };
      const url = "/catalogos/actualizanotificaciones";
      catalogoUpdate(data,url).then((response) =>{
        setOpen(false);
        getAllNotificaciones();
      })
    }
  };  

  const navigate = useNavigate();

  const columns = [
    {
      field:       "acciones",
      headerName:  "",
      width:       90,
      headerAlign: "center",
      hideable:    false,
      renderCell: (cellValues: any) => {
        
        return (
          <Box>
           <Tooltip title={"Editar"}>
           <IconButton color="primary" 
          onClick={(event) => {
            setuuid(cellValues.row.uuid);
            setEncabezado(cellValues.row.Encabezado);
            setDescripcion(cellValues.row.Descripcion);
            setCreadoPor(cellValues.row.CreadoPor);   
            setModificadoPor(cellValues.row.ModificadoPor);
            setEliminadoPor(cellValues.row.EliminadoPor);
            handleOpen();
          }}
           >
                <EditIcon />
              </IconButton>
           </Tooltip>
           <Tooltip title={"Eliminar registro con ID: " + cellValues.row.uuid}>
              <IconButton color="error"
              onClick={(event) => {handleDelete(event, cellValues);}}
               >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field:       "Encabezado",
      headerName:  "Nombre",
      width:       400,
      hideable:    false,
      headerAlign: "center",
    },
    {
      field:       "Descripcion",
      headerName:  "Descripcion",
      width:       700,
      hideable:    false,
      headerAlign: "center",
    }
  ];


  const [rows, setRows] = useState([]);
  const getAllNotificaciones = () => {
   axios ({
    method: "get",
    url:    process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienenotificaciones",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
   })
    .then(({ data }) => {
      if (data) {
        setRows(data);
      } else {
        setRows([])
      }
    })
    .catch(function (error) {
      console.error(error)
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "("+error.response.status+") "+error.response.data.message,
      }).then((r) => navigate("/Notificaciones"));
    });
  };

  const [rowsDependencias, setRowsDependencias] = useState<Array<NotificacionesInterface>>([]);

   useEffect(() => {
    getAllNotificaciones();
  }, []);

    // esto es para que se ejecuten todo los get de los listados solo cuando se abra la modal,
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {

    if (open===false) {
      setuuid("");
      setEncabezado("");
      setDescripcion("");
    }
  }, [open]);

  return (
    <Grid container sx={{ 
      top       : "9vh",
      position  : "absolute",
      fontFamily: "MontserratSemiBold" }}>
      <Grid item xs={12}         sx={{
          top       : "-9vh",
          position  : "absolute",
          fontFamily: "MontserratSemiBold",
        }}>

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
          <Typography color="text.primary"> Catálogo de Notificaciones </Typography>
        </Breadcrumbs>
      </Grid> 

      <Grid container justifyContent={"center"} item xs={0} paddingLeft={0} paddingTop={5}>
      <Grid item xs={12} md={12} mt={2}>
      <Card sx={{ p: 1, boxShadow: 4,width:'100%'}}> {/* Hay que poner wl width en 100%% o buscar la forma de que abwsrque todo esl */}
      <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold"}} />
      <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}>  Catálogo de Notificaciones </Typography>  
      <CardContent>
      <Box display="flex" justifyContent="flex-end">
      <Grid sx={{display: "flex", alignItems: "right", justifyContent: "right", paddingBottom:"2%", paddingRight:"1%"}}>
                    <Button
                      // onClick={(event) => handleNewBtnClick(event)}
                      onClick={handleOpen}
                      variant="contained"
                      sx={
                        {margin:"1%", 
                        color:"#FFFFFF", 
                      }} >
                      <Typography
                        sx={{
                          color: "#FFFFFF",
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
                        sx={{
                          color: "#ffffff",
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
      id={(row: any) => row.uuid}
      columns={columns}
      rows={rows}
      /> 

      {/* Inician los campos del formulario para registrar la nueva Dependencia */}
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
                <Typography  variant="h5" sx={{ padding:"2%"}}> Catálogo de Notificaciones </Typography>  
              </Box>
		        </Grid>

            <Grid item xs={6}>
            <Box sx={{
              '& > :not(style)': { m: 1.3, width: '80%' },   }}
		          display="flex">
                <TextField
                id="Encabezado" 
                label="Nombre de la notificación"
                value={Encabezado} 
                onChange={(v) => {setEncabezado(v.target.value)}}
                size="small"
                variant="outlined" />
                </Box>
            </Grid>


            <Grid item xs={6}>
            <Box sx={{
              '& > :not(style)': { m: 1.3, width: '80%' },   }}
		          display="flex">
                <TextField
                id="Descripcion" 
                label="Descripción"
                value={Descripcion} 
                onChange={(v) => {setDescripcion(v.target.value)}}
                size="small"
                variant="outlined" />
                </Box>
            </Grid>
            

            <Grid item xs={12}>
            <Box  maxWidth="100%"  paddingTop={2} paddingBottom={2} display="flex" justifyContent="end" >
              <Button onClick={() => {
                            if (uuid === "") {
                              handleSave()  
                            }else{
                              handleUpdate()  
                            }
                            } } variant="contained" 
              sx={{margin:"1%",
              color:"white",
              "&:hover":{
                color:"#15212f",
                },
               }} > 
               Guardar 
               </Button>


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


      </CardContent>
      </Card>
      </Grid>
      </Grid>

    </Grid>
  );
}