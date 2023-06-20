import React from "react";
import {Card,CardHeader,Grid,Breadcrumbs,Tooltip,Link,IconButton,Typography,Box,TextField,CardContent,Button,Input,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MUIXDataGrid from "../../Grid/MUIXDataGrid";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";
import {catalogoSave,catalogoDelete,catalogoUpdate,} from "../../../services/CatalogoServices";
import InputMask from "react-input-mask";

// Estilos para la ventana Modal
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

export interface DependenciasInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  Direccion: string;
  Telefono: string;
  uuidTipoDependencia: string;
  uuidTitular: string;
  uuidSecretaria: string;
  CreadoPor: any;
  ModificadoPor: any;
  EliminadoPor: any;
}

export interface TiposDependenciasInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
  Descripcion: string;
}

export interface TitularDependenciaInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
}

export interface SecretariaInterface {
  uuid: string;
  Cve: string;
  Nombre: string;
}

// inicia el componente
export default function Dependencias() {
  // Crear las interfaces que se mandaran en los endpoints
  const [TitularDependencia, setTitularDependencia] = useState("");
  const [TipoDependencia, setTipoDependencia] = useState("");
  const [Secretaria, setSecretaria] = useState("");

  const [uuid, setuuid] = useState("");
  const [Cve, setCve] = useState("");
  const [Nombre, setNombre] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [UUID, setUUID] = useState("");

  const [creadopor, setCreadoPor] = useState("");
  const [modificadopor, setModificadoPor] = useState("");
  const [eliminadopor, setEliminadoPor] = useState("");

  // Abrir modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Guardar un registro nuevo.
  const handleSave = () => {
    if (Cve === "" || Nombre === "" || Direccion === "" || Telefono === "" || TipoDependencia === "" || TitularDependencia === "" || Secretaria === "") {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        cve: Cve,
        nombre: Nombre,
        direccion: Direccion,
        telefono: Telefono.replace(" ", ""),
        uuidtipodependencia: TipoDependencia,
        uuidtitular: TitularDependencia,
        uuidsecretaria: Secretaria,
        creadopor: localStorage.getItem("IdUsuario"),
        eliminadopor: eliminadopor,
      };
      const url = "/catalogos/guardadependencias";
      catalogoSave(data, url).then((response) => {
        setOpen(false);
        getAllDependencias();
      });
    }
  };
  // Handle delete
  const handleDelete = (event: any, cellValues: any) => {
    const data = cellValues.row.uuid;
    const cve = cellValues.row.Cve;
    const url = "/catalogos/eliminadependencias";
    catalogoDelete(data, url, cve).then((response) => {
      setOpen(false);
      getAllDependencias();
    });
  };
  // Handle update
  const handleUpdate = () => {
    if (Nombre === "" || Direccion === "" || Telefono === "" || TipoDependencia === "" || TitularDependencia === "" || Secretaria === "") {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "Completa todos los campos para continuar",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        uuid: uuid,
        cve: Cve,
        nombre: Nombre,
        direccion: Direccion,
        telefono: Telefono.replace(" ", ""),
        uuidtipodependencia: TipoDependencia,
        uuidtitular: TitularDependencia,
        uuidsecretaria: Secretaria,
        creadopor: creadopor,
        modificadopor: localStorage.getItem("IdUsuario"),
        eliminadopor: eliminadopor,
      };
      const url = "/catalogos/actualizadependencias";
      catalogoUpdate(data, url).then((response) => {
        setOpen(false);
        getAllDependencias();
      });
    }
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
            <Tooltip title={"Editar"}>
              <IconButton
                color="primary"
                onClick={(event) => {
                  setuuid(cellValues.row.uuid);
                  setCve(cellValues.row.Cve);
                  setNombre(cellValues.row.Nombre);
                  setDireccion(cellValues.row.Direccion);
                  setTelefono(cellValues.row.Telefono);
                  setTipoDependencia(cellValues.row.uuidTipoDependencia);
                  setTitularDependencia(cellValues.row.uuidTitular);
                  setSecretaria(cellValues.row.uuidSecretaria);
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
              <IconButton
                color="error"
                onClick={(event) => {
                  handleDelete(event, cellValues);
                }}
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
      width: 150,
      hideable: false,
      headerAlign: "left",
    },
    // Tercer columna donde se mostrara el path
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 300,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Direccion",
      headerName: "Direccion",
      width: 400,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Telefono",
      headerName: "Telefono",
      width: 150,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "TiposDependencias",
      headerName: "Tipo de Dependencias",
      width: 200,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Titular",
      headerName: "Titular",
      width: 200,
      hideable: false,
      headerAlign: "left",
    },
    {
      field: "Secretarias",
      headerName: "Secretarías",
      width: 200,
      hideable: false,
      headerAlign: "left",
    },
  ];

  const [rowsTiposDependencias, setRowsTiposDependencias] = useState<
    Array<TiposDependenciasInterface>
  >([]);
  const getAllTipoDependencias = () => {
    axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_ENDPOINT +
        "/catalogos/obtienetiposdependencias",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        if (data) {
          setRowsTiposDependencias(data);
        } else {
          setRowsTiposDependencias([]);
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text:
            "(" + error.response.status + ") " + error.response.data.message,
        });
      });
  };

  const [rowsTitular, setRowsTitular] = useState<
    Array<TitularDependenciaInterface>
  >([]);
  const getAllTitular = () => {
    axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_ENDPOINT +
        "/catalogos/obtienetitular",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        if (data) {
          setRowsTitular(data);
        } else {
          setRowsTitular([]);
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text:
            "(" + error.response.status + ") " + error.response.data.message,
        });
      });
  };

  const [rowsSecretarias, setRowsSecretarias] = useState<
    Array<SecretariaInterface>
  >([]);
  const getAllSecretarias = () => {
    axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_ENDPOINT +
        "/catalogos/obtienesecretaria",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        if (data) {
          setRowsSecretarias(data);
        } else {
          setRowsSecretarias([]);
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text:
            "(" + error.response.status + ") " + error.response.data.message,
        });
      });
  };

  const [rows, setRows] = useState([]);
  const getAllDependencias = () => {
    axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_ENDPOINT +
        "/catalogos/obtienedependencias",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setRows(data);
        } else {
          setRows([]);
        }
      })
      .catch(function (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Mensaje",
          text:
            "(" + error.response.status + ") " + error.response.data.message,
        }).then((r) => navigate("/Dependencias"));
      });
  };

  // const [rowsDependencias, setRowsDependencias] = useState< Array<DependenciasInterface>>([]);
  useEffect(() => {
    getAllDependencias();
  }, []);

  // esto es para que se ejecuten todo los get de los listados solo cuando se abra la modal,
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {
    if (open === false) {
      setuuid("");
      setCve("");
      setNombre("");
      setDireccion("");
      setTelefono("");
      setTipoDependencia("");
      setTitularDependencia("");
      setSecretaria("");
      getAllTipoDependencias();
      getAllTitular();
      getAllSecretarias();
    }
  }, [open]);

  return (
    <Grid
      container
      sx={{
        top: "9vh",
        position: "absolute",
        fontFamily: "MontserratSemiBold",
      }}
    >
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/inicio">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/Configuracion/Catalogos/Catalogos">
            Configuración
          </Link>
          <Link
            underline="hover" color="inherit" href="/Configuracion/Catalogos/Catalogos">
            Catálogos
          </Link>
          <Typography color="text.primary">
            Catálogo de Dependencias{" "}
          </Typography>
        </Breadcrumbs>
      </Grid>

      <Grid container xs={12} justifyContent={"center"}>
        <Grid item xs={12} md={12} mt={2}>
          <Card sx={{ p: 1, boxShadow: 4, width: "100%" }}>
            {/* Hay que poner wl width en 100%% o buscar la forma de que abwsrque todo esl */}
            <CardHeader sx={{ position: "absolute", fontFamily: "MontserratSemiBold" }} />
            <Typography variant="h5" sx={{ paddingTop: "1%", paddingLeft: "1%" }}>
              Catálogo de Dependencias
            </Typography>
            <CardContent>
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
                        color: "#FFFFFF",
                        "&:hover": {
                          color: "#15212f",
                        },
                        fontFamily: "MontserratRegular, sans-serif",
                        fontSize: "100%",
                      }}
                    >
                      Agregar
                    </Typography>
                  </Button>
                  <Button
                    onClick={() => navigate(-1)}
                    color="secondary"
                    sx={{ margin: "1%" }}
                    variant="contained"
                  >
                    <Typography
                      sx={{
                        color: "#ffffff",
                        "&:hover": {
                          color: "#15212f",
                        },
                        fontFamily: "MontserratRegular, sans-serif",
                        fontSize: "100%",
                      }}
                    >
                      Cancelar
                    </Typography>
                  </Button>
                </Grid>
              </Box>
              <MUIXDataGrid id={(row: any) => row.Cve} columns={columns} rows={rows}/>
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
                        <Typography variant="h5" sx={{ padding: "2%" }}>
                          {" "}
                          Catálogo de Dependencias{" "}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box component="form">
                        <Box
                          sx={{
                            "& > :not(style)": { m: 1.3, width: "100%" },
                          }}
                          display="flex"
                        >
                          <TextField
                            id="Cve"
                            label="Cve"
                            size="small"
                            inputProps={{ maxLength: 10 }}
                            variant="outlined"
                            value={Cve}
                            disabled={uuid !== "" ? true : false}
                            onChange={(v) => {
                              setCve(v.target.value);
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={9}>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1.3, width: "100%" },
                        }}
                        display="flex"
                      >
                        <TextField
                          id="Nombre"
                          label="Nombre de la Dependencia"
                          value={Nombre}
                          onChange={(v) => {
                            setNombre(v.target.value);
                          }}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1.3, width: "100%" },
                        }}
                        display="flex"
                      >
                        <TextField
                          id="Direccion"
                          label="Dirección"
                          value={Direccion}
                          onChange={(v) => {
                            setDireccion(v.target.value);
                          }}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1.3, width: "100%" },
                        }}
                        display="flex"
                      >
                        <InputMask
                          mask="999 999 9999"
                          value={Telefono}
                          disabled={false}
                          onChange={(v) => {
                            setTelefono((v.target.value).replace(" ", ""));
                            console.log(Telefono)
                          }}
                          maskChar={" "}
                        >
                          <TextField
                          id="Telefono"
                          label="Teléfono"
                          size="small"
                          variant="outlined"
                        />
                        </InputMask>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1.3, width: "100%" },
                        }}
                        display="flex"
                      >
                        <FormControl fullWidth sx={{ bgColor: "#fff" }}>
                          <InputLabel sx={{ marginTop: "-4px" }}>
                            Seleccione un Tipo de Dependencia
                          </InputLabel>
                          <Select
                            id="TipoDependencia"
                            value={TipoDependencia}
                            label="Tipo de Dependencia"
                            size="small"
                            displayEmpty
                            onChange={(v) => {
                              setTipoDependencia(v.target.value);
                            }}
                          >
                            <MenuItem value=""></MenuItem>
                            {rowsTiposDependencias.length > 0 &&
                              rowsTiposDependencias?.map(
                                (TipoDependencia, index) => (
                                  <MenuItem value={TipoDependencia.uuid}>
                                    {TipoDependencia.Cve +
                                      "-" +
                                      TipoDependencia.Nombre}
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1.3, width: "100%" },
                        }}
                        display="flex"
                      >
                        <FormControl fullWidth sx={{ bgColor: "#fff" }}>
                          <InputLabel sx={{ marginTop: "-4px" }}>
                            Seleccione un Titular de la Dependencia
                          </InputLabel>
                          <Select
                            labelId="Titular"
                            id="Titular"
                            value={TitularDependencia}
                            label="Titular"
                            size="small"
                            displayEmpty
                            onChange={(v) => {
                              setTitularDependencia(v.target.value);
                            }}
                          >
                            <MenuItem value=""></MenuItem>
                            {rowsTitular.length > 0 &&
                              rowsTitular?.map((TitularDependencia, index) => (
                                <MenuItem value={TitularDependencia.uuid}>
                                  {TitularDependencia.Cve +
                                    "-" +
                                    TitularDependencia.Nombre}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          "& > :not(style)": { m: 1.3, width: "100%" },
                        }}
                        display="flex"
                      >
                        <FormControl fullWidth sx={{ bgColor: "#fff" }}>
                          <InputLabel sx={{ marginTop: "-4px" }}>
                            Seleccione una Secretaría
                          </InputLabel>
                          <Select
                            labelId="Secretaria"
                            id="Secretaria"
                            value={Secretaria}
                            label="Secretaría"
                            size="small"
                            displayEmpty
                            onChange={(v) => {
                              setSecretaria(v.target.value);
                            }}
                          >
                            -<MenuItem value=""></MenuItem>
                            {rowsSecretarias.length > 0 &&
                              rowsSecretarias?.map((Secretaria, index) => (
                                <MenuItem value={Secretaria.uuid}>
                                  {Secretaria.Cve + "-" + Secretaria.Nombre}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
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
                        <Button
                          onClick={() => {
                            if (uuid === "") {
                              handleSave();
                            } else {
                              handleUpdate();
                            }
                          }}
                          variant="contained"
                          sx={{
                            margin: "1%",
                            color: "white",
                            "&:hover": {
                              color: "#15212f",
                            },
                          }}
                        >
                          Guardar
                        </Button>

                        <Button
                          onClick={handleClose}
                          variant="contained"
                          color="secondary"
                          sx={{
                            margin: "1%",
                            color: "white",
                            "&:hover": {
                              color: "#15212f",
                            },
                          }}
                        >
                          {" "}
                          Cancelar{" "}
                        </Button>
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
