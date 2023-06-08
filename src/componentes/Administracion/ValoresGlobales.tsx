import React from "react";
import {Edit as EditIcon, Delete as DeleteIcon,} from "@mui/icons-material";
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

const ListaModulos = [
  {
    value: '0',
    label: '',
  },  
  {
    value: '1',
    label: 'ADMINISTRACIÓN',
  },
  {
    value: '2',
    label: 'CONFIGURACIÓN',
  },
  {
    value: '3',
    label: 'MUEBLES',
  },
  {
    value: '4',
    label: 'VEHÍCULOS',
  },
  {
    value: '5',
    label: 'INMUEBLES',
  },  
  {
    value: '6',
    label: 'TICKETS',
  },
  {
    value: '7',
    label: 'DASHBOARD Y REPORTES',
  },
];

const TipoParam = [
  {
    value: '0',
    label: '',
  },  
  {
    value: '1',
    label: 'CADENA',
  },
  {
    value: '2',
    label: 'ENTERO',
  },
  {
    value: '3',
    label: 'DECIMAL',
  },
];


export interface ValoresGlobaleInterface {
  uuid: string
  Modulo: string
  Cve: string
  Descripcion: string
  Tipo: number
  ParamStr: string
  ParamInt: number
  ParamFloat: number | undefined;
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

export default function VariablesGlobales() {
// definicio de variables de estado
const navigate                          = useNavigate();
const [uuid, setuuid]                   = useState("");
const [modulo, setModulo]               = useState("");
const [cve, setCve]                     = useState("");
const [descripcion, setDescripcion]     = useState("");
const [tipo, setTipo]                   = useState("");
const [paramstr, setParamStr]           = useState("");
const [paramint, setParamInt]           = useState("");
const [paramfloat, setParamFloat]       = useState("");
const [creadopor, setCreadoPor]         = useState("");
const [modificadopor, setModificadoPor] = useState("");
const [eliminadopor, setEliminadoPor]   = useState("");

// Abrir modal
const [open, setOpen]               = React.useState(false);
const handleOpen = ()   => setOpen(true);
const handleClose = ()  => setOpen(false);

  // Handle save
  const handleSave = () => {
    if (modulo === "" || cve === "" || descripcion === "" || tipo === "" ){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        modulo          : modulo,
        cve             : cve,
        descripcion     : descripcion,
        tipo            : tipo,
        paramstr        : paramstr,
        paramint         : paramint,
        paramfloat      : paramfloat,
        creadopor     : localStorage.getItem("IdUsuario"),
        eliminadopor  : eliminadopor,
      };
      axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/administracion/guardavalores",
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
            title : "Creado Exitosamente",
          });
          getAllValoresGlobales();
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
          url       : process.env.REACT_APP_APPLICATION_ENDPOINT +"/administracion/eliminavalores",
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
            getAllValoresGlobales();
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
    if (modulo === "" || cve === "" || descripcion === "" || tipo === "" ){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar ",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        uuid            : uuid,
        modulo          : modulo,
        cve             : cve,
        descripcion     : descripcion,
        tipo            : tipo,
        paramstr        : paramstr,
        paramint         : paramint,
        paramfloat      : paramfloat,
        creadopor       : creadopor,
        modificadopor   : localStorage.getItem("IdUsuario"),
        eliminadopor    : eliminadopor,
      };
      axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/administracion/actualizavalores",
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
          getAllValoresGlobales();
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
           <Tooltip title={"Editar " + cellValues.row.Cve}>
           <IconButton color="primary" 
              // al darle editar se llenan los campos con los valores seleccionados del renglon
              onClick={(event) => {     
                setuuid(cellValues.row.uuid);
                setModulo(cellValues.row.Modulo);
                setCve(cellValues.row.Cve);
                setDescripcion(cellValues.row.Descripcion);
                setTipo(cellValues.row.Tipo.toString());
                setParamStr(cellValues.row.ParamStr);
                setParamInt(cellValues.row.ParamInt);
                setParamFloat(cellValues.row.ParamFloat);                
                setCreadoPor(cellValues.row.CreadoPor);   
                setModificadoPor(cellValues.row.ModificadoPor);
                setEliminadoPor(cellValues.row.EliminadoPor);
                console.log(cellValues.row);
                handleOpen();
              }}
           >
                <EditIcon />
              </IconButton>
           </Tooltip>
           <Tooltip title={"Eliminar" + cellValues.row.Nombre}>
              <IconButton color="secondary"
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
      field: "Modulo",
      headerName: "Modulo",
      width: 150,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Cve",
      headerName: "Cve",
      width: 100,
      hideable: false,
      headerAlign: "left",
    },    
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 350,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Tipo",
      headerName: "Tipo",
      width: 75,
      hideable: false,
      headerAlign: "left",
      renderCell: (cellValues: any) => {
        return (
          <Box>
            {
              cellValues.row.Tipo===1? "CADENA":cellValues.row.Tipo===2? "ENTERO":"DECIMAL"
            }
          </Box>
        );
      },
    },        
    {
      field: "ParamStr",
      headerName: "ParamStr",
      width: 220,
      hideable: false,
      headerAlign: "left",
    },        
    {
      field: "ParamInt",
      headerName: "ParamInt",
      width: 80,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "ParamFloat",
      headerName: "ParamFloat",
      width: 100,
      hideable: false,
      headerAlign: "left",
    },
  ];
 
// declaracion de la variable de estado "hook" que recibira la informacion del endpoint
const [rows, setRows] = useState([]);
// aqui es el consumo del endpoint para obtener el listado de la base de datos
const getAllValoresGlobales = () => {
  axios({
    method    : "get",
    url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/administracion/obtienevalores",
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
      }).then((r) => navigate("/"));
    });
};

  // esto es solo para que se ejecute la rutina de obtiene cuando cargue la pagina
  useEffect(() => {
    getAllValoresGlobales();
  }, []);

  // esto es para que se limpien todas las variables al salir del modal
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {
    if (open===false) {
      setuuid("");
      setModulo("");
      setCve("");
      setDescripcion("");
      setTipo("");
      setParamStr("");
      setParamInt("");
      setParamFloat("");      
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
        <Link underline="hover" color="inherit" href="/Inicio">
            Administración
        </Link>
          <Typography color="text.primary">Variables Globales</Typography>
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
            <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}>Variables Globales</Typography>                  
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
                    <Grid item xs={6}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          select
                          label     ="Modulo"
                          size      ="small"
                          variant   ="outlined"
                          disabled  = {uuid!=="" ? true:false}
                          value     ={modulo}
                          onChange  ={(v) => {setModulo(v.target.value); }}
                        >
                        {ListaModulos.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}                
                        </TextField>
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
                          inputProps={{ maxLength: 20 }}
                          label     ="Cve"
                          size      ="small"
                          variant   ="outlined"
                          disabled  = {uuid!=="" ? true:false}
                          value     ={cve}
                          onChange  ={(v) => {setCve(v.target.value); }}
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
                          inputProps={{ maxLength: 100 }}
                          label     ="Descripcion"
                          size      ="small"
                          variant   ="outlined"
                          // disabled  = {uuid!=="" ? true:false}
                          value     ={descripcion}
                          onChange  ={(v) => {setDescripcion(v.target.value); }}
                          helperText= {`Carácteres restantes ${255-descripcion.length}` }
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={3}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          select
                          label     ="Tipo"
                          size      ="small"
                          variant   ="outlined"
                          value     ={tipo}
                          onChange  ={(v) => {setTipo(v.target.value); 
                                              setParamStr("");
                                              setParamInt("");
                                              setParamFloat("");}}
                        >
                        {TipoParam.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}                
                        </TextField>                          
                      </Box>
                    </Grid>

                    <Grid item xs={9}>
                      <Box
                        component="form"
                        sx={{"& > :not(style)": { m: 1.3, width: "100%" },}}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          inputProps={{ maxLength: 255 }}
                          label     ="ParamStr"
                          size      ="small"
                          variant   ="outlined"
                          disabled  = {tipo !== "1" ?  true:false}
                          value     ={paramstr}
                          onChange  ={(v) => {setParamStr(v.target.value); }}
                          helperText= {tipo === "1" ?  `Carácteres restantes ${255-paramstr.length}` :""} 
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
                          label     ="ParamInt"
                          size      ="small"
                          variant   ="outlined"
                          disabled  = {tipo !== "2" ?  true:false}
                          value     ={paramint}
                          onChange  ={(v) => {setParamInt(v.target.value); }}
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
                          label     ="ParamFloat"
                          size      ="small"
                          variant   ="outlined"
                          disabled  = {tipo !== "3" ?  true:false}
                          value     ={paramfloat}
                          onChange  ={(v) => {setParamFloat(v.target.value); }}
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
