import React from "react";
import {Edit as EditIcon, Delete as DeleteIcon,} from "@mui/icons-material";import { useEffect, useState } from "react";
import axios from "axios";
import {Box,Breadcrumbs,Button,Card,CardContent,CardHeader,Grid,IconButton,Link,TextField,Tooltip,Typography,} from "@mui/material";
import MUIXDataGrid from "../../Grid/MUIXDataGrid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {catalogoSave, catalogoDelete, catalogoUpdate} from "../../../services/CatalogoServices";

export interface RangosInterface {
  uuid: string
  Tipo: string
  Verde: number
  Amarillo: number
  Rojo: number
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 5,
  p: 2,
};

export default function Rangos() {
  const navigate                    = useNavigate();
  const [uuid, setuuid]             = useState("");
  const [tipo, setTipo]             = useState("");
  const [verde, setVerde]           = useState("");
  const [amarillo, setAmarillo]     = useState("");
  const [rojo, setRojo]             = useState("");

  const [creadopor, setCreadoPor]         = useState("");
  const [modificadopor, setModificadoPor] = useState("");
  const [eliminadopor, setEliminadoPor]   = useState("");

  // Abrir modal
  const [open, setOpen]               = React.useState(false);
  const handleOpen = ()   => setOpen(true);
  const handleClose = ()  => setOpen(false);
  
  const handleSave = () => {
    if (tipo === "" || verde === "" || amarillo === "" || rojo === "" ){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        tipo          : tipo,
        verde         : verde,
        amarillo      : amarillo,
        rojo          : rojo,
        creadopor     : localStorage.getItem("IdUsuario"),
        modificadopor : modificadopor,
        eliminadopor  : eliminadopor,
      };      const url = "/catalogos/guardarango";
      catalogoSave(data,url).then((response) =>{
        setOpen(false);
        getAllRangos();
      })
    }
  };
  const handleDelete = (event: any, cellValues: any) => {    const data = cellValues.row.uuid;
    const descripcion = cellValues.row.Tipo;   
    const url = "/catalogos/eliminarango";
    catalogoDelete(data,url,descripcion).then((response) =>{
      setOpen(false);
      getAllRangos();
    })
  };
  const handleUpdate = () => {
    if (tipo === "" || verde === "" || amarillo === "" || rojo === "" ){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        uuid         : uuid,
        tipo          : tipo,
        verde         : verde,
        amarillo      : amarillo,
        rojo          : rojo,
        creadopor             : creadopor,
        modificadopor: localStorage.getItem("IdUsuario"),
        eliminadopor : eliminadopor,
      };      const url = "/catalogos/actualizarango";
      catalogoUpdate(data,url).then((response) =>{
        setOpen(false);
        getAllRangos();
      })
    }
  }; 

  const columns = [
    {
      field: "acciones",
      headerName: "",
      width: 80,
      headerAlign: "center",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
           <Tooltip title={"Editar " + cellValues.row.Tipo}>
           <IconButton color="primary" 
              // al darle editar se llenan los campos con los valores seleccionados del renglon
              onClick={(event) => {     
                setuuid(cellValues.row.uuid);
                setTipo(cellValues.row.Tipo);
                setVerde(cellValues.row.Verde);
                setAmarillo(cellValues.row.Amarillo);
                setRojo(cellValues.row.Rojo);
                setCreadoPor(cellValues.row.CreadoPor);   
                setModificadoPor(cellValues.row.ModificadoPor);
                setEliminadoPor(cellValues.row.EliminadoPor);
                handleOpen();
              }}
           >
                <EditIcon />
              </IconButton>
           </Tooltip>
           <Tooltip title={"Eliminar " + cellValues.row.Tipo}>
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
      field: "Tipo",
      headerName: "Tipo",
      width: 370,
      hideable: false,
      headerAlign: "left",
      bgcolor:"green",
    },
    {
      field: "Verde",
      headerName: "Verde",
      width: 150,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Amarillo",
      headerName: "Amarillo",
      width: 150,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Rojo",
      headerName: "Rojo",
      width: 150,
      hideable: false,
      headerAlign: "left",
    },
  ];  
  const camposCsv = ["Tipo","Verde","Amarillo","Rojo"];
  const [rows, setRows] = useState([]);
  const getAllRangos = () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienerango",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        const rows = data;
        setRows(rows);
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Configuracion/Catálogos/Rangoss"));
      });
  };

  useEffect(() => {
    getAllRangos();
    document.title = 'Catálogo de Rangos';
  }, []);

  // esto es para que se ejecuten todo los get de los listados solo cuando se abra la modal,
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {
    if (open===false) {
      setuuid("");
      setTipo("");
      setVerde("");
      setAmarillo("");
      setRojo("");
    }

  }, [open]);  
 
  return (
    // contenedor principal
    <Grid container sx={{ }}>
      <Grid sx={{}} item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/Inicio">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/Configuracion/Catálogos/Rangos">
            Configuración
          </Link>
          <Link underline="hover" color="inherit" href="/Configuracion/Catálogos/Rangos">
            Usuarios
          </Link>
          <Typography color="text.primary">Catálogo de Rangos</Typography>
        </Breadcrumbs>
      </Grid>
      {/* la verdad este grid aun no entiendo que es o que funcion tiene */}
      <Grid container xs={12} justifyContent={"center"}>
        <Grid item xs={12} md={12} mt={2}>
          {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
          <Card sx={{ p: 0, boxShadow: 8 }}>
          <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold"}} />
      <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}>  Catálogo de Rangos </Typography> 
            <CardContent sx={{ fontFamily: "MontserratBold", bgcolor: "" }}>
              {/* aqui es el cardcontent que es el contenido del card,y ponemos primero un box y estamos dibujando el boton para agregar un nuevo registro */}
              <Box display="flex" justifyContent="flex-end">
                <Grid
                  sx={{
                    display       : "flex",
                    alignItems    : "right",
                    justifyContent: "right",
                    paddingBottom : "2%",
                    paddingRight  : "1%",
                  }}
                >
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{ margin: "1%", color: "#FFFFFF" }}
                  >
                    <Typography
                      sx={{
                        color     : "#FFFFFF","&:hover": { color: "#15212f" },
                        fontFamily: "MontserratRegular, sans-serif",
                        fontSize  : "100%",
                      }}
                    >
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
              {/* aqui se asigna un id unico que tiene que tener cada renglon, asi que asignamos un numero al azar*/}
              <MUIXDataGrid id={Math.random} columns={columns} rows={rows} camposCsv={camposCsv}/>
              {/* AGREGAR---------------------------------------------------------------------------------------------------------------------------------------------- */}
              {/* Inician los campos del formulario*/}
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
                        <Typography variant="h5" sx={{ padding: "1%" }}>
                          Detalle de Rangos
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          inputProps={{ maxLength: 10 }}
                          label     ="Tipo"
                          size      ="small"
                          variant   ="outlined"                          
                          value     ={tipo}
                          disabled  = {uuid!=="" ? true:false}
                          onChange  ={(v) => {setTipo(v.target.value); }}
                        />
                      </Box>
                    </Grid>
                  
                    <Grid item xs={6}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          type      ="number"
                          label     ="Verde"
                          size      ="small"
                          variant   ="outlined"
                          value     ={verde}
                          onChange  ={(v) => {setVerde(v.target.value); }}
                          color="success"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          type      ="number"
                          label     ="Amarillo"
                          size      ="small"
                          variant   ="outlined"
                          value     ={amarillo}
                          onChange  ={(v) => {setAmarillo(v.target.value); }}
                          color="warning"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                        
                      >
                        <TextField
                          type      ="number"
                          label     ="Rojo"
                          size      ="small"
                          variant   ="outlined"
                          value     ={rojo}
                          onChange  ={(v) => {setRojo(v.target.value); }}
                          color="error"
                        />
                      </Box>
                    </Grid>


                    <Grid item xs={12}>
                      <Box
                        maxWidth      ="100%"
                        paddingTop    ={2}
                        paddingBottom ={2}
                        display       ="flex"
                        justifyContent="end"
                      >
                        <Button
                          onClick={() => {
                            if (uuid === "") {
                              handleSave()  
                            }else{
                              handleUpdate()  
                            }
                            } 
                          }
                          variant ="contained"
                          sx      ={{margin: "1%", color: "white","&:hover": {color: "#15212f",},}}
                        >
                          Guardar
                        </Button>
                        <Button
                          onClick ={handleClose}
                          variant ="contained"
                          color   ="secondary"
                          sx      ={{margin: "1%",color: "white","&:hover": {color: "#15212f",},}}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
              {/* Termina la sección de los campos del formulario*/}
              {/* AGREGAR----------------------------------------------------------------------------------------------------------*/}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
