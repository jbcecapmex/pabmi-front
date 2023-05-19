import React, { useEffect, useState } from "react";
import {Edit as EditIcon,Add as AddIcon,Delete as DeleteIcon,} from "@mui/icons-material";
import axios from "axios";
import {Box,Breadcrumbs,Button,Card,CardContent,FormControl,Grid,IconButton,InputLabel,Link,OutlinedInput,TextField,Tooltip,Typography,} from "@mui/material";
import MUIXDataGrid from "../Grid/MUIXDataGrid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// componente de sweetalert2 para el uso de los mensajes de alertas
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
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

// estructura que se va a llenar con la informacion que regresa el endpoint
// tiene que tener el mismo nombre que el campo en la DB
export interface TicketsInterface {
  uuid: string;
  Cve: string;
  Descripcion: string;
  Asignadoa: string;
  uuidTipoTicket: string;
  TipoTicket: string;
  uuidCategoriaTicket: string;
  CategoriaTicket: string;
  uuidPrioridadTicket: string;
  PrioridadTicket: string;
  uuidStatusTicket: string;
  StatusTicket: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
}
export interface EmpleadoInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
}
export interface TiposInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  Descripcion: string;
}
export interface CategoriasInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  Descripcion: string;
}
export interface PrioridadesInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  Descripcion: string;
}
export interface StatusInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  Descripcion: string;
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


export default function TicketsDashBoard() {
// definicio de variables de estado
  const navigate                      = useNavigate();
  const [uuid, setuuid]               = useState("");
  const [cve, setCve]                 = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo]               = useState("");
  const [categoria, setCategoria]     = useState("");
  const [prioridad, setPrioridad]     = useState("");
  const [status, setStatus]           = useState("");
  const [asignadoa, setAsignadoa]     = React.useState("");

  // Abrir modal
  const [open, setOpen]               = React.useState(false);
  const handleOpen = ()   => setOpen(true);
  const handleClose = ()  => setOpen(false);

  // Handle save
  const handleSave = () => {
    if (descripcion === "" || cve === "" || asignadoa === "" || tipo === "" || categoria === "" || prioridad === "" || status === ""){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        cve                   : cve,
        descripcion           : descripcion,
        asignadoa             : asignadoa,
        uuidtipoticket        : tipo,
        uuidcategoriaticket   : categoria,
        uuidprioridadticket   : prioridad,
        uuidstatusticket      : status,
        creadopor             : localStorage.getItem("IdUsuario"),
      };
      axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/tickets/guardatickets",
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
            title : "Ticket Creado Exitosamente",
          });
          getAllTickets();
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
          url       : process.env.REACT_APP_APPLICATION_ENDPOINT +"/tickets/eliminatickets",
          headers   : {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("jwtToken") || "",
          },
          data      : data,
        })
          .then(function (response) {
            Toast.fire({
              icon  : "success",
              title : "Ticket Eliminado Exitosamente",
            });
            getAllTickets();
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
    if (descripcion === "" || cve === "" || asignadoa === "" || tipo === "" || categoria === "" || prioridad === "" || status === ""){
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
        descripcion           : descripcion,
        asignadoa             : asignadoa,
        uuidtipoticket        : tipo,
        uuidcategoriaticket   : categoria,
        uuidprioridadticket   : prioridad,
        uuidstatusticket      : status,
        modificadopor         : localStorage.getItem("IdUsuario"),
      };
      axios({
        method  : "post",
        url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/tickets/actualizatickets",
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
            title : "Ticket Creado Exitosamente",
          });
          getAllTickets();
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

  // Set columns and rows for DataGrid
  const columns = [
    // primer columna del grid donde ponemos los botones de editar y eliminar
    {
      field: "acciones",
      headerName: "",
      width: 80,
      headerAlign: "center",
      hideable: false,
      renderCell: (cellValues: any) => {
        return (
          <Box>
            <Tooltip title={"Actualiza Ticket " + cellValues.row.uuid}>
              <IconButton
                color="primary"
                // al darle editar se llenan los campos con los valores seleccionados del renglon
                onClick={(event) => {
                  // console.log(cellValues.row);
                  setuuid(cellValues.row.uuid);
                  setCve(cellValues.row.Cve);
                  setDescripcion(cellValues.row.Descripcion);
                  setTipo(cellValues.row.uuidTipoTicket);
                  setCategoria(cellValues.row.uuidCategoriaTicket);
                  setPrioridad(cellValues.row.uuidPrioridadTickets);
                  setStatus(cellValues.row.uuidStatusTicket);
                  setAsignadoa(cellValues.row.Asignadoa);
                  handleOpen();
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Elimina Ticket " + cellValues.row.uuid}>
              <IconButton
                color="error"
                onClick={(event) => {handleDelete(event, cellValues);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    // segunda columna donde se mostrara el cve
    // el nombre que se coloca en el field : "tiene que ser exactamente como esta escrito el nombre de la columna en la base de datos"
    {
      field: "Cve",
      headerName: "Cve",
      width: 50,
      hideable: false,
      headerAlign: "left",
    },
    // Tercer columna donde se mostrara el Descripcion
    {
      field: "Descripcion",
      headerName: "Descripción",
      width: 500,
      hideable: false,
      headerAlign: "left",
    },
    // Cuarto columna donde se mostrara el Asignado a
    {
      field: "Nombre",
      headerName: "Asignadoa",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
    // Quinta columna donde se mostrara tipo
    {
      field: "TipoTicket",
      headerName: "Tipo",
      width: 200,
      hideable: false,
      headerAlign: "left",
    },
    // Sexta columna donde se mostrara categoria
    {
      field: "CategoriaTicket",
      headerName: "Categoria",
      width: 200,
      hideable: false,
      headerAlign: "left",
    },
    // Septima columna donde se mostrara prioridad
    {
      field: "PrioridadTicket",
      headerName: "Prioridad",
      width: 200,
      hideable: false,
      headerAlign: "left",
    },
    // Octaba columna donde se mostrara status
    {
      field: "StatusTicket",
      headerName: "Status",
      width: 200,
      hideable: false,
      headerAlign: "left",
    },
  ];

// declaracion de la variable de estado "hook" que recibira la informacion del endpoint
  const [rows, setRows] = useState([]);
  // aqui es el consumo del endpoint para obtener el listado de tickets de la base de datos
  const getAllTickets = () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/tickets/obtienetickets",
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
        }).then((r) => navigate("/Tickets"));
      });
  };

  // declaracion de la variable de estado "hook" que recibira la informacion del endpoint  
  const [rowsempleados, setRowsEmpleados] = useState<Array<EmpleadoInterface>>([]);
  // aqui es el consumo del endpoint para obtener el listado de empleados de la base de datos
  const getAllEmpleados = () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtieneempleados",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        const rowsempleados = data;
        setRowsEmpleados(rowsempleados);
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        });
      });
  };

  // declaracion de la variable de estado "hook" que recibira la informacion del endpoint    
  const [rowstipos, setRowsTipos] = useState<Array<TiposInterface>>([]);
  // aqui es el consumo del endpoint para obtener el listado de tipos de tickets de la base de datos
  const getAllTipos = () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/tickets/obtienetipostickets",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        const rowstipos = data.data.data;
        setRowsTipos(rowstipos);
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        });
      });
  };

  // declaracion de la variable de estado "hook" que recibira la informacion del endpoint    
  const [rowscategorias, setRowsCategorias] = useState<Array<CategoriasInterface>>([]);
  // aqui es el consumo del endpoint para obtener el listado de tipos de tickets de la base de datos
  const getAllCategorias = () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/tickets/obtienecategoriastickets",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        const rowscategorias = data.data.data;
        setRowsCategorias(rowscategorias);
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        });
      });
  };

  // declaracion de la variable de estado "hook" que recibira la informacion del endpoint    
  const [rowsprioridades, setRowsPrioridades] = useState<Array<PrioridadesInterface>>([]);
  // aqui es el consumo del endpoint para obtener el listado de tipos de tickets de la base de datos
  const getAllPrioridades = () => {
    axios({
      method    : "get",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/tickets/obtieneprioridadtickets",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        const rowsprioridades = data.data.data;
        setRowsPrioridades(rowsprioridades);
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        });
      });
  };
  
  // declaracion de la variable de estado "hook" que recibira la informacion del endpoint    
  const [rowsstatus, setRowsStatus] = useState<Array<StatusInterface>>([]);
  // aqui es el consumo del endpoint para obtener el listado de status de tickets de la base de datos
  const getAllStatus = () => {
    axios({
      method  : "get",
      url     : process.env.REACT_APP_APPLICATION_ENDPOINT + "/tickets/obtienestatustickets",
      headers : {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        const rowsstatus = data.data.data;
        setRowsStatus(rowsstatus);
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        });
      });
  };

  // esto es solo para que se ejecute la rutina de obtiene cuando cargue la pagina
  useEffect(() => {
    getAllTickets();
  }, []);

  // esto es para que se ejecuten todo los get de los listados solo cuando se abra la modal,
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {
    getAllEmpleados();
    getAllTipos();
    getAllCategorias();
    getAllPrioridades();
    getAllStatus();
    if (open===false) {
      setuuid("");
      setCve("");
      setDescripcion("");
      setTipo("");
      setCategoria("");
      setPrioridad("");
      setStatus("");
      setAsignadoa("");      
    }
  }, [open]);

  // -------------------------------------------------------------------------------------------
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
          <Link underline="hover" color="inherit" href="/">
            Inicio
          </Link>
          <Typography color="text.primary">Ticketsss</Typography>
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
                        fontSize: "100%",
                      }}
                    >
                      Agregar
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
                          Detalle de Ticket
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
                        />
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
                            // labelId     ="Asignadoa"
                            id          ="asignadoa"
                            value       ={asignadoa}
                            // label       ="Tipo de Dependencia"
                            size        ="small"
                            displayEmpty
                            onChange    ={(v) => { setAsignadoa(v.target.value); }}
                          >
                            <MenuItem value=""></MenuItem>
                            {rowsempleados.map((empleado, index) => (
                              <MenuItem value={empleado.uuid}>
                                {empleado.Nombre+" "+empleado.ApellidoPaterno+" "+empleado.ApellidoMaterno}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                            Tipo de ticket
                          </InputLabel>
                          <Select
                            // labelId   ="Tipo de ticket"
                            id        ="tipo"
                            value     ={tipo}
                            // label     ="Tipo de ticket"
                            size      ="small"
                            displayEmpty
                            onChange  ={(v) => { setTipo(v.target.value); }}
                          >
                            <MenuItem value=""></MenuItem>
                            {rowstipos.map((tipo, idex) => (
                              <MenuItem value={tipo.uuid}>
                                {tipo.Cve + "-" + tipo.Nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        component="form"
                        sx={{ "& > :not(style)": { m: 1.3, width: "100%" },  }}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <FormControl fullWidth sx={{ bgColor: "#fff" }}>
                          <InputLabel sx={{ marginTop: "-4px" }}>
                            Categoria de ticket
                          </InputLabel>
                          <Select
                            // labelId     ="Categoria de ticket"
                            id          ="categoria"
                            value       ={categoria}
                            // label       ="Categoria de ticket"
                            size        ="small"
                            displayEmpty
                            onChange    ={(v) => { setCategoria(v.target.value); }}
                          >
                            <MenuItem value=""></MenuItem>
                            {rowscategorias.map((categoria, idex) => (
                              <MenuItem value={categoria.uuid}>
                                {categoria.Cve + "-" + categoria.Nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1.3, width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <FormControl fullWidth sx={{ bgColor: "#fff" }}>
                          <InputLabel sx={{ marginTop: "-4px" }}>
                            Prioridad de ticket
                          </InputLabel>
                          <Select
                            // labelId     ="Prioridad de ticket"
                            id          ="prioridad"
                            value       ={prioridad}
                            // label       ="Prioridad de ticket"
                            size        ="small"
                            displayEmpty
                            onChange    ={(v) => { setPrioridad(v.target.value); }}
                          >
                            <MenuItem value=""></MenuItem>
                            {rowsprioridades.map((prioridad, idex) => (
                              <MenuItem value={prioridad.uuid}>
                                {prioridad.Cve + "-" + prioridad.Nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                            Status de ticket
                          </InputLabel>
                          <Select
                            // labelId     ="Status de ticket"
                            id            ="status"
                            value         ={status}
                            // label         ="Status de ticket"
                            size          ="small"
                            displayEmpty
                            onChange      ={(v) => { setStatus(v.target.value); }}
                          >
                            <MenuItem value=""></MenuItem>
                            {rowsstatus.map((status, idex) => (
                              <MenuItem value={status.uuid}>
                                {status.Cve + "-" + status.Nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        component="form"
                        sx={{ "& > :not(style)": { m: 1.3, width: "100%" }, }}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          // label     ="Descripción"
                          size      ="small"
                          variant   ="outlined"
                          value     ={descripcion}
                          onChange  ={(v) => { setDescripcion(v.target.value); }}
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
