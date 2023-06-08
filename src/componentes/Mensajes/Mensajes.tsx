import React from "react";
import {OpenInNew as OpenIcon, ForwardToInbox as ForwardIcon, MarkEmailRead as Leido, MarkEmailUnread  as NoLeido} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import {Box,Breadcrumbs,Button,Card,CardContent,CardHeader,FormControl,Grid,IconButton,InputLabel,Link,MenuItem,Select,TextField,Tooltip,Typography,} from "@mui/material";
import MUIXDataGrid from "../Grid/MUIXDataGrid";
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


export interface UsuariosInterface {
  uuid: string
  uuidTiCentral: string
  uuidDependencia: string
  NombreCorto: string
  uuidPuesto: string
}

export interface MensajesInterface {
  uuid: string
  Asignadoa: string
  Encabezado: string
  Descripcion: string
  Visto: string;
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

export default function Mensajes() {
// definicio de variables de estado
const navigate                          = useNavigate();
const [uuid, setuuid]                   = useState("");
const [asignadoa, setAsignadoa]         = useState("");
const [encabezado, setEncabezado]       = useState("");
const [descripcion, setDescripcion]     = useState("");
// const [visto, setVisto]                 = useState("");
const [creadopor, setCreadoPor]         = useState("");
const [modificadopor, setModificadoPor] = useState("");
const [eliminadopor, setEliminadoPor]   = useState("");

// Abrir modal
const [open, setOpen]               = React.useState(false);
const handleOpen = ()   => setOpen(true);
const handleClose = ()  => setOpen(false);


  // Handle save
  const handleSave = () => {
    if (encabezado === "" || descripcion === ""){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        asignadoa       : asignadoa,
        encabezado      : encabezado,
        descripcion     : descripcion,
        visto           : 0,
        creadopor       : localStorage.getItem("IdUsuario"),
        eliminadopor    : eliminadopor,
      };
      axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/guardamensajes",
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
            title : "Enviado Exitosamente",
          });
          getAllMensajes();
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
          url       : process.env.REACT_APP_APPLICATION_ENDPOINT +"/mensajes/eliminamensajes",
          headers   : {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("jwtToken") || "",
          },
          data      : data,
        })
          .then(function (response) {
            Toast.fire({
              icon  : "success",
              title : " Eliminado Exitosamente",
            });
            getAllMensajes();
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
    if (encabezado === "" || descripcion === ""){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar ",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        uuid                  : uuid,
        encabezado            : encabezado,
        descripcion           : descripcion,
        creadopor             : creadopor,
        modificadopor         : localStorage.getItem("IdUsuario"),
        eliminadopor          : eliminadopor,
      };
      axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/actualizamensajes",
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
            title : " Actualizado Exitosamente",
          });
          getAllMensajes();
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

  const handleLeido = () => {
    //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
    const data = {
      uuid   : uuid,
      visto  : 1,

    };
    console.log(data);
    axios({
      method  : "post",
      url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/mensajeleido",
      headers : {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("jwtToken") || "",
      },
      data    : data,
    })
  };   

  const columns = [
    {
      field: "acciones",
      headerName: "",
      width: 40,
      headerAlign: "center",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
           <Tooltip title={"Abrir " + cellValues.row.Encabezado}>
           <IconButton color="primary" 
              // al darle editar se llenan los campos con los valores seleccionados del renglon
              onClick={(event) => {     
                
                setuuid(cellValues.row.uuid);
                console.log(uuid);
                setAsignadoa(cellValues.row.Asignadoa);
                console.log(asignadoa);
                setEncabezado(cellValues.row.Encabezado);
                setDescripcion(cellValues.row.Descripcion);
                setCreadoPor(cellValues.row.CreadoPor);   
                setModificadoPor(cellValues.row.ModificadoPor);
                setEliminadoPor(cellValues.row.EliminadoPor);
                handleOpen();
              }}
           >
                <OpenIcon />
              </IconButton>
           </Tooltip>
           {/* <Tooltip title={"Eliminar" + cellValues.row.Nombre}>
              <IconButton color="secondary"
                onClick={(event) => {handleDelete(event, cellValues);}}
               >
                <ForwardIcon />
              </IconButton>
            </Tooltip> */}
          </Box>
        );
      },
    },
     // segunda columna donde se mostrara el nombre
     {
      field: "Encabezado",
      headerName: "Encabezado",
      width: 100,
      hideable: false,
      headerAlign: "left",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 900,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Visto",
      headerName: "Leido",
      width: 50,
      hideable: false,
      headerAlign: "left",
      renderCell: (cellValues: any) => {
        return (
          <Box>
            {
              cellValues.row.Visto===1? <Leido color="success" />:<NoLeido color="info" />
            }
          </Box>
        );
      },
    },
  ];
 
  // declaracion de la variable de estado "hook" que recibira la informacion del endpoint
  const [rows, setRows] = useState([]);
  // aqui es el consumo del endpoint para obtener el listado de la base de datos
  const getAllMensajes = () => {
    //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
    const data = {
      // asignadoa         :  "a4f79e57-32b7-11ed-aed0-040300000000",
      asignadoa         : localStorage.getItem("IdUsuario"),
    };
    axios({
      method    : "post",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/detallemensajes",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
      data    : data,      
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
        }).then((r) => navigate("/Mensajes/Mensajes"));
      });
  };

// declaracion de la variable de estado "hook" que recibira la informacion del endpoint
const [rowsasignadoa, setRowsAsignadoa] = useState<Array<UsuariosInterface>>([]);
// aqui es el consumo del endpoint para obtener el listado de menus de la base de datos
const getAllAsignadoa = () => {
  axios({
    method    : "get",
    url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtieneusuarios",
    headers   : {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    // aqui se recibe lo del endpoint en response
    .then(({ data }) => {
      const rowsasignadoa = data;
      setRowsAsignadoa(rowsasignadoa);
    })
    .catch(function (error) {
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "("+error.response.status+") "+error.response.data.message,
      })
      // .then((r) => navigate("/Configuracion/Usuarios"));
    });
};

  // esto es solo para que se ejecute la rutina de obtiene cuando cargue la pagina
  useEffect(() => {
    getAllMensajes();
  }, []);

  // esto es para que se ejecuten todo los get de los listados solo cuando se abra la modal,
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {
    if (open===false) {
      getAllAsignadoa();
      setuuid("");
      setAsignadoa("");
      setEncabezado("");
      setDescripcion("");
      getAllMensajes();
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
          <Typography color="text.primary">Mensajes</Typography>
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
            <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold"}} />
            <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}>Mensajes</Typography>                  
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
                      Nuevo
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
                          Mensajes
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        component="form"
                        sx={{ "& > :not(style)": { m: 1.3, width: "100%" }, }}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <FormControl fullWidth sx={{ bgColor: "#fff" }}>
                          <InputLabel sx={{ marginTop: "-4px" }}>
                            Asignado a
                          </InputLabel>
                          <Select
                            id          ="usuario"
                            value       ={asignadoa}
                            disabled  = {uuid!=="" ? true:false}
                            size        ="small"
                            displayEmpty
                            onChange    ={(v) => { setAsignadoa(v.target.value); }}
                          >
                            <MenuItem value=""></MenuItem>
                            {rowsasignadoa.map((asignadoa, index) => (
                              <MenuItem value={asignadoa.uuidTiCentral}>
                                {asignadoa.NombreCorto}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        {/* espacio en blanco */}
                      </Box>
                    </Grid>
                    <Grid item xs={24}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          label     ="Encabezado"
                          size      ="small"
                          variant   ="outlined"
                          disabled  = {uuid!=="" ? true:false}
                          value     ={encabezado}
                          onChange  ={(v) => {setEncabezado(v.target.value); }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={24}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          label     ="Mensaje"
                          // size      ="small"
                          multiline
                          rows={10}
                          variant   ="outlined"
                          disabled  = {uuid!=="" ? true:false}
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
                        {uuid==="" ? <Button
                        onClick={() => {
                          if (uuid === "") {
                            handleSave()  
                          }else{
                            handleUpdate()  
                          }
                          } 
                        }
                        // disabled  = {uuid!=="" ? true:false}
                        variant ="contained"
                        sx      ={{margin: "1%", color: "white","&:hover": {color: "#15212f",},}}
                      >
                        ENVIAR
                      </Button>:null}
                      

                        <Button
                          onClick={() => {
                            if (uuid !== "") {handleLeido()}
                            handleClose();
                            } 
                          }
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
