import React from "react";
import { OpenInNew as OpenIcon, ForwardToInbox as ForwardIcon,} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Chip, Stack, FormControl, Grid, IconButton, InputLabel, Link, MenuItem, Select, TextField, Tooltip, Typography, } from "@mui/material";
import MUIXDataGrid from "../Grid/MUIXDataGrid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: false,
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
  const navigate = useNavigate();
  const [uuid, setuuid] = useState("");
  const [asignadoa, setAsignadoa] = useState("");
  const [encabezado, setEncabezado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [creadopor, setCreadoPor] = useState("");
  const [modificadopor, setModificadoPor] = useState("");
  const [eliminadopor, setEliminadoPor] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (encabezado === "" || descripcion === "") {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Completa todos los campos para continuar",
      });
    } else {
      const data = {
        asignadoa: asignadoa,
        encabezado: encabezado,
        descripcion: descripcion,
        visto: 0,
        creadopor: localStorage.getItem("IdUsuario"),
        eliminadopor: eliminadopor,
      };
      axios({
        method: "post",
        url: process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/guardamensajes",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        data: data,
      })
        .then(function (response) {
          setOpen(false);
          Toast.fire({
            icon: "success",
            title: "Enviado Exitosamente",
          });
          getAllMensajes();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Mensaje",
            text: "(" + error.response.status + ") " + error.response.data.msg,
          });
        });
    }
  };
  // Handle delete
  // const handleDelete = (event: any, cellValues: any) => {
  //   Swal.fire({
  //     title: "Estas Seguro(a)?",
  //     text: `Estas a punto de eliminar un registro (${cellValues.row.Descripcion})`,
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Eliminar",
  //     confirmButtonColor: "#dc3545",
  //     cancelButtonColor: "#0d6efd",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const data = { uuid: cellValues.row.uuid };
  //       axios({
  //         method: "post",
  //         url: process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/eliminamensajes",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: localStorage.getItem("jwtToken") || "",
  //         },
  //         data: data,
  //       })
  //         .then(function (response) {
  //           Toast.fire({
  //             icon: "success",
  //             title: " Eliminado Exitosamente",
  //           });
  //           getAllMensajes();
  //         })
  //         .catch(function (error) {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Mensaje",
  //             text: "(" + error.response.status + ") " + error.response.data.msg,
  //           });
  //         });
  //     }
  //   });
  // };
  const handleUpdate = () => {
    if (encabezado === "" || descripcion === "") {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Completa todos los campos para continuar ",
      });
    } else {
      const data = {
        uuid: uuid,
        encabezado: encabezado,
        descripcion: descripcion,
        creadopor: creadopor,
        modificadopor: localStorage.getItem("IdUsuario"),
        eliminadopor: eliminadopor,
      };
      axios({
        method: "post",
        url: process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/actualizamensajes",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        data: data,
      })
        .then(function (response) {
          setOpen(false);
          Toast.fire({
            icon: "success",
            title: " Actualizado Exitosamente",
          });
          getAllMensajes();
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Mensaje",
            text: "(" + error.response.status + ") " + error.response.data.msg,
          });
        });
    }
  };

  const handleLeido = () => {
    const data = {
      uuid: uuid,
      visto: 1,
    };
    console.log(data);
    axios({
      method: "post",
      url: process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/mensajeleido",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      data: data,
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
          </Box>
        );
      },
    },
    {
      field: "Encabezado",
      headerName: "Encabezado",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 1000,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Visto",
      headerName: "Leido",
      width: "auto",
      hideable: false,
      headerAlign: "left",
      renderCell: (cellValues: any) => {
        return (
          <Box>
            {
              cellValues.row.Visto === 1 ? 
                <Stack direction="row" spacing={1}>                  
                  <Chip label="Leido" color="success" variant="outlined" />
                </Stack>
                : 
                  <Stack direction="row" spacing={1}>
                    <Chip label="Nuevo" color="primary" variant="outlined" />                    
                  </Stack>
            }
          </Box>
        );
      },
    },
  ];

  const [rows, setRows] = useState([]);
  const getAllMensajes = () => {
    const data = {
      asignadoa: localStorage.getItem("IdUsuario"),
    };
    axios({
      method: "post",
      url: process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/detallemensajes",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      data: data,
    })
      .then(({ data }) => {
        const rows = data;
        setRows(rows);

      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.message,
        }).then((r) => navigate("/Mensajes/Mensajes"));
      });
  };

  const [rowsasignadoa, setRowsAsignadoa] = useState<Array<UsuariosInterface>>([]);
  const getAllAsignadoa = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_ENDPOINT + "/catalogos/obtieneusuarios",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        if (data) {
          setRowsAsignadoa(data);
        } else {
          setRowsAsignadoa([])
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text: "(" + error.response.status + ") " + error.response.data.message,
        })
        // .then((r) => navigate("/Configuracion/Usuarios"));
      });
  };
  
  useEffect(() => {
    getAllMensajes();
  }, []);

  useEffect(() => {
    if (open === false) {
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
    <Grid container sx={{}}>
      <Grid sx={{}} item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/Inicio">
            Inicio
          </Link>
          <Typography color="text.primary">Mensajes</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        sx={{ fontFamily: "MontserratSemiBold" }}
      >
        <Grid sx={{}} item xs={12}>
          {/* este componente es la card que se encuentra en el centro en donde vamos a meter todo lo de la pantalla */}
          <Card sx={{ p: 0, boxShadow: 8, height: "79vh" }}>
            <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold" }} />
            <Typography variant="h5" sx={{ paddingTop: "1%", paddingLeft: "1%" }}>Mensajes</Typography>
            <CardContent sx={{ fontFamily: "MontserratBold", bgcolor: "" }}>
              {/* aqui es el cardcontent que es el contenido del card,y ponemos primero un box y estamos dibujando el boton para agregar un nuevo registro */}
              <Box display="flex" justifyContent="flex-end">
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "right",
                    justifyContent: "right",
                    paddingBottom: "2%",
                    paddingRight: "1%",
                  }}
                >
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{ margin: "1%", color: "#FFFFFF" }}
                  >
                    <Typography
                      sx={{
                        color: "#FFFFFF", "&:hover": { color: "#15212f" },
                        fontFamily: "MontserratRegular, sans-serif",
                        fontSize: "100%",
                      }}
                    >
                      Nuevo
                    </Typography>
                  </Button>
                  <Button
                    onClick={() => navigate(-1)}
                    color="secondary"
                    sx={{ margin: "1%" }}
                    variant="contained">
                    <Typography
                      sx={{
                        color: "#ffffff",
                        "&:hover": {
                          color: "#15212f",
                        },
                        fontFamily: "MontserratRegular, sans-serif",
                        fontSize: "100%",
                      }}>
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
                            id="usuario"
                            value={asignadoa}
                            disabled={uuid !== "" ? true : false}
                            size="small"
                            displayEmpty
                            onChange={(v) => { setAsignadoa(v.target.value); }}
                          >
                            <MenuItem value=""></MenuItem>
                            {
                              rowsasignadoa.length > 0 &&
                              rowsasignadoa?.map((asignadoa, index) => (
                                <MenuItem value={asignadoa.uuidTiCentral}>
                                  {asignadoa.NombreCorto}
                                </MenuItem>
                              ))
                            }
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
                        sx={{ "& > :not(style)": { m: 1.3, width: "100%" }, }}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          label="Encabezado"
                          size="small"
                          variant="outlined"
                          disabled={uuid !== "" ? true : false}
                          value={encabezado}
                          onChange={(v) => { setEncabezado(v.target.value); }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={24}>
                      <Box
                        component="form"
                        sx={{ "& > :not(style)": { m: 1.3, width: "100%" }, }}
                        noValidate
                        autoComplete="off"
                        display="flex"
                      >
                        <TextField
                          label="Mensaje"
                          // size      ="small"
                          multiline
                          rows={10}
                          variant="outlined"
                          disabled={uuid !== "" ? true : false}
                          value={descripcion}
                          onChange={(v) => { setDescripcion(v.target.value); }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        maxWidth="100%"
                        paddingTop={2}
                        paddingBottom={2}
                        display="flex"
                        justifyContent="end"
                      >
                        {uuid === "" ? <Button
                          onClick={() => {
                            if (uuid === "") {
                              handleSave()
                            } else {
                              handleUpdate()
                            }
                          }
                          }
                          // disabled  = {uuid!=="" ? true:false}
                          variant="contained"
                          sx={{ margin: "1%", color: "white", "&:hover": { color: "#15212f", }, }}
                        >
                          ENVIAR
                        </Button> : null}


                        <Button
                          onClick={() => {
                            if (uuid !== "") { handleLeido() }
                            handleClose();
                          }
                          }
                          variant="contained"
                          color="secondary"
                          sx={{ margin: "1%", color: "white", "&:hover": { color: "#15212f", }, }}
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
