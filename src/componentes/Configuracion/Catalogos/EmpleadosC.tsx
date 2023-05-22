import React from "react";
import {Edit as EditIcon, Delete as DeleteIcon,} from "@mui/icons-material";import { useEffect, useState } from "react";
import axios from "axios";
import {Box,Breadcrumbs,Button,Card,CardContent,Grid,IconButton,Link,TextField,Tooltip,Typography,} from "@mui/material";
import MUIXDataGrid from "../../Grid/MUIXDataGrid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

// componente de sweetalert2 para el uso de los mensajes de alertas
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: false,
  //background: '#2e7d32',
  //color: '#fff',  
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export interface PerfilesInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  ApellidoPaterno: string; 
  ApellidoMaterno: string;
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

export default function Empleados() {
// definicio de variables de estado
const navigate                      = useNavigate();
const [uuid, setuuid]               = useState("");
const [cve, setCve]                 = useState("");
const [nombre, setNombre]          = useState("");
const [ApellidoPaterno, setApellidoPaterno] = useState("");
const [ApellidoMaterno, setApellidoMaterno] = useState("");
const [CreadoPor, setCreadoPor] = useState("");


// Abrir modal
const [open, setOpen]               = React.useState(false);
const handleOpen = ()   => setOpen(true);
const handleClose = ()  => setOpen(false);


  // Handle save
  const handleSave = () => {
    if (cve === "" || nombre === "" || ApellidoPaterno === ""|| ApellidoMaterno === ""){
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
        ApellidoPaterno       : ApellidoPaterno,
        ApellidoMaterno       : ApellidoMaterno,
        creadopor             : localStorage.getItem("IdUsuario"),
      };
      console.log(data);
      axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/guardaempleados",
        headers : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
        },
        data    : data,
      })
        .then(function (response) {
          setOpen(false);
          Toast.fire({
            icon  : "success",
            title : "Perfil Creado Exitosamente",
          });
          getAllEmpleados();
        })
        .catch(function (error) {
          Swal.fire({
            icon  : "error",
            title : "Mensaje",
            text  : "(" + error.response.status + ") " + error.response.data.msg,});
        });
    }
  };
  // Handle delete
  const handleDelete = (event: any, cellValues: any) => {
    Swal.fire({
      title               : "Estas Seguro(a)?",
      text                : `Estas a punto de eliminar un registro (${cellValues.row.Descripcion})`,
      icon                : "question",
      showCancelButton    : true,
      confirmButtonText   : "Eliminar",
      confirmButtonColor  : "#dc3545",
      cancelButtonColor   : "#0d6efd",
      cancelButtonText    : "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { uuid: cellValues.row.uuid };
        axios({
          method    : "post",
          url       : process.env.REACT_APP_APPLICATION_ENDPOINT +"/catalogos/eliminaempleados",
          headers   : {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("jwtToken") || "",
          },
          data      : data,
        })
          .then(function (response) {
            Toast.fire({
              icon  : "success",
              title : "Perfil Eliminado Exitosamente",
            });
            getAllEmpleados();
          })
          .catch(function (error) {
            Swal.fire({
              icon  : "error",
              title : "Mensaje",
              text  : "(" + error.response.status + ") " + error.response.data.msg,});
          });
      }
    });
  };

// Handle update
  const handleUpdate = () => {
    if (cve === "" || nombre === "" || ApellidoPaterno === ""|| ApellidoMaterno === ""){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuarrrrrrrr",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        uuid                  : uuid,
        cve                   : cve,
        nombre                : nombre,
        ApellidoPaterno       : ApellidoPaterno,
        ApellidoMaterno       : ApellidoMaterno,
        CreadoPor             : CreadoPor,
        modificadopor         : localStorage.getItem("IdUsuario"),
      };
      console.log(data);
      axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/actualizaempleados",
        headers : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
        },
        data    : data,
      })
        .then(function (response) {
          setOpen(false);
          Toast.fire({
            icon  : "success",
            title : "Perfil Actualizado Exitosamente",
          });
          getAllEmpleados();
        })
        .catch(function (error) {
          Swal.fire({
            icon  : "error",
            title : "Mensaje",
            text  : "(" + error.response.status + ") " + error.response.data.msg,
          });
        });
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
                setApellidoPaterno(cellValues.row.ApellidoPaterno);
                setApellidoMaterno(cellValues.row.ApellidoMaterno);
                setCreadoPor(cellValues.row.CreadoPor);
                handleOpen();
              }}
           >
                <EditIcon />
              </IconButton>
           </Tooltip>
           <Tooltip title={"Eliminar" + cellValues.row.Nombre}>
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
      field: "ApellidoPaterno",
      headerName: "ApellidoPaterno",
      width: 650,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "ApellidoMaterno",
      headerName: "ApellidoMaterno",
      width: 650,
      hideable: false,
      headerAlign: "left",
    },
  ];
 
  // declaracion de la variable de estado "hook" que recibira la informacion del endpoint
  const [rows, setRows] = useState([]);
  // aqui es el consumo del endpoint para obtener el listado de Perfil de la base de datos
  const getAllEmpleados = () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtieneempleados",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      // aqui se recibe lo del endpoint en response
      .then(({ data }) => {
        const rows = data;
        setRows(rows);
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Configuracion/Usuarios/Perfiles"));
      });
  };

  // esto es solo para que se ejecute la rutina de obtiene cuando cargue la pagina
  useEffect(() => {
    getAllEmpleados();
  }, []);

  // esto es para que se ejecuten todo los get de los listados solo cuando se abra la modal,
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {
    if (open===false) {
      setuuid("");
      setCve("");
      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
    }
  }, [open]);  
 
  return (
    // contenedor principal
    <Grid
      container
      sx={{
        top       : "9vh",
        position  : "absolute",
        fontFamily: "MontserratSemiBold",
      }}
    >
      {/* grid de Breadcrumbs */}
      <Grid
        item
        xs={12}
        sx={{
          top       : "-9vh",
          position  : "absolute",
          fontFamily: "MontserratSemiBold",
        }}
      >
        {/* este componente es para armar la ruta que se muestra arriba y poder navegar hacia atras */}
        {/* ejemplo inicio/configuracion/catalogos/marca */}
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/Inicio">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/Configuracion/Usuarios/Usuarios">
            Configuración
          </Link>
          <Link underline="hover" color="inherit" href="/Configuracion/Usuarios/Usuarios">
            Usuarios
          </Link>
          <Typography color="text.primary">Catálogo de Empleados </Typography>
        </Breadcrumbs>
      </Grid>
      {/* la verdad este grid aun no entiendo que es o que funcion tiene */}
      <Grid
        container
        justifyContent={"center"}
        sx={{ fontFamily: "MontserratSemiBold" }}
      >
        {/* este grid es del card del centro el que contiene los objetos */}
        <Grid item xs={12} md={12} mt={-5}>
          {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
          <Card sx={{ p: 0, boxShadow: 8, height: "86vh" }}>
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
                          Detalle de Perfil
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
                          label     ="Cve"
                          size      ="small"
                          variant   ="outlined"
                          value     ={cve}
                          disabled  = {uuid!=="" ? true:false}
                          onChange  ={(v) => {setCve(v.target.value); }}
                          inputProps={{ maxLength: 10 }}
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
                          label     ="ApellidoPaterno"
                          size      ="small"
                          variant   ="outlined"
                          value     ={ApellidoPaterno}
                          onChange  ={(v) => {setApellidoPaterno(v.target.value); }}
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
                          label     ="ApellidoMaterno"
                          size      ="small"
                          variant   ="outlined"
                          value     ={ApellidoMaterno}
                          onChange  ={(v) => {setApellidoMaterno(v.target.value); }}
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
