import React from "react";
import {Edit as EditIcon, Delete as DeleteIcon,} from "@mui/icons-material";import { useEffect, useState } from "react";
import axios from "axios";
import {Box,Breadcrumbs,Button,Card,CardContent,Grid,IconButton,Link,TextField,Tooltip,Typography,} from "@mui/material";
import MUIXDataGrid from "../../Grid/MUIXDataGrid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {catalogoSave, catalogoDelete, catalogoUpdate} from "../../../services/CatalogoServices";

export interface TipoTransaccionInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  Descripcion: string;
  creadopor:          string;
  modificadopor:      string;
  eliminadopor:       string;    
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

export default function TipoReporte() {
// definicio de variables de estado
const navigate                          = useNavigate();
const [uuid, setuuid]                   = useState("");
const [cve, setCve]                     = useState("");
const [nombre, setNombre]               = useState("");
const [descripcion, setDescripcion]     = useState("");
const [creadopor, setCreadoPor]         = useState("");
const [modificadopor, setModificadoPor] = useState("");
const [eliminadopor, setEliminadoPor]   = useState("");

// Abrir modal
const [open, setOpen]   = React.useState(false);
const handleOpen = ()   => setOpen(true);
const handleClose = ()  => setOpen(false);


  // Handle save
  const handleSave = () => {
    if (cve === "" || nombre === "" || descripcion === ""){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        cve                   : cve,
        nombre                : nombre,
        descripcion           : descripcion,
        creadopor             : localStorage.getItem("IdUsuario"),
        eliminadopor          : eliminadopor,
      };
      const url = "/catalogos/guardatipostransacciones";
      catalogoSave(data,url).then((response) =>{
        setOpen(false);
        getAllTipoTransaccion();
      })
    }
  };
  // Handle delete
  const handleDelete = (event: any, cellValues: any) => {
    const data = cellValues.row.uuid;
    const descripcion = cellValues.row.Descripcion;   
    const url = "/catalogos/eliminatipostransacciones";
    catalogoDelete(data,url,descripcion).then((response) =>{
      setOpen(false);
      getAllTipoTransaccion();
    })
  };
// Handle update
  const handleUpdate = () => {
    if (cve === "" || nombre === "" || descripcion === ""){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        uuid                  : uuid,
        cve                   : cve,
        nombre                : nombre,
        descripcion           : descripcion,
        creadopor             : creadopor,
        modificadopor         : localStorage.getItem("IdUsuario"),
        eliminadopor          : eliminadopor,
      };
      const url = "/catalogos/actualizatipostransacciones";
      catalogoUpdate(data,url).then((response) =>{
        setOpen(false);
        getAllTipoTransaccion();
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
           <Tooltip title={"Editar " + cellValues.row.Nombre}>
           <IconButton color="primary" 
              // al darle editar se llenan los campos con los valores seleccionados del renglon
              onClick={(event) => {     
                setuuid(cellValues.row.uuid);
                setCve(cellValues.row.Cve);
                setNombre(cellValues.row.Nombre);
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
           <Tooltip title={"Eliminar " + cellValues.row.Nombre}>
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
     // segunda columna donde se mostrara el nombre
     {
      field: "Cve",
      headerName: "Cve",
      width: 100,
      hideable: false,
      headerAlign: "left",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 150,
      hideable: false,
      headerAlign: "left",
    },
    // cuarta columna donde se mostrara si esta activo o no
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 650,
      hideable: false,
      headerAlign: "left",
    },
  ];
 
  // declaracion de la variable de estado "hook" que recibira la informacion del endpoint
  const [rows, setRows] = useState([]);
  // aqui es el consumo del endpoint para obtener el listado de Permiso de la base de datos
  const getAllTipoTransaccion = () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtienetipostransacciones",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      // aqui se recibe lo del endpoint en response
      .then(({data}) => {
        if (data) {
          setRows(data);
        } else {
          setRows([])
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Configuracion/Catalogos/TipoTransaccion"));
      });
  };

  // esto es solo para que se ejecute la rutina de obtiene cuando cargue la pagina
  useEffect(() => {
    getAllTipoTransaccion();
  }, []);

  // esto es para que se ejecuten todo los get de los listados solo cuando se abra la modal,
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {
    if (open===false) {
      setuuid("");
      setCve("");
      setNombre("");
      setDescripcion("");
    }
  }, [open]);  
 
  return (
    // contenedor principal
    <Grid container sx={{ }}>
      <Grid sx={{}} item xs={12}>
        {/* este componente es para armar la ruta que se muestra arriba y poder navegar hacia atras */}
        {/* ejemplo inicio/configuracion/catalogos/marca */}
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/Inicio">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/Configuracion/Catalogos/Catalogos">
            Configuración
          </Link>
          <Link underline="hover" color="inherit" href="/Configuracion/Catalogos/Catalogos">
            Catálogos
          </Link>
          <Typography color="text.primary">Catálogo de Tipo de Transacción</Typography>
        </Breadcrumbs>
      </Grid>
      {/* la verdad este grid aun no entiendo que es o que funcion tiene */}
      <Grid container xs={12} justifyContent={"center"}>
        <Grid item xs={12} md={12} mt={2}>
          {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
          <Card sx={{ p: 0, boxShadow: 8 }}>
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
              <MUIXDataGrid id={Math.random} columns={columns} rows={rows} />
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
                          Detalle de Tipo de Transacción
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
                          label     ="Cve"
                          size      ="small"
                          variant   ="outlined"
                          value     ={cve}
                          disabled  = {uuid!=="" ? true:false}
                          onChange  ={(v) => {setCve(v.target.value); }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        {/* espacio en blanco */}
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
                          label     ="Nombre"
                          size      ="small"
                          variant   ="outlined"
                          value     ={nombre}
                          onChange  ={(v) => {setNombre(v.target.value); }}
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
                          label     ="Descripcion"
                          size      ="small"
                          variant   ="outlined"
                          value     ={descripcion}
                          onChange  ={(v) => {setDescripcion(v.target.value); }}
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
