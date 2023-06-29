import React from "react";
import {Edit as EditIcon} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import {Box,Breadcrumbs,Button,Card,CardContent,Grid,IconButton,Link,MenuItem,TextField,Tooltip,Typography,} from "@mui/material";
import MUIXDataGrid from "../Grid/MUIXDataGrid";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {catalogoUpdate} from "../../services/CatalogoServices";

export interface ValoresSistemaInterface {
  uuid: string
  Cve: string
  Descripcion: string
  Tipo: number
  ParamStr: string
  ParamInt: any
  CreadoPor: string
  ModificadoPor: any
  EliminadoPor: any
  created_at: string
  updated_at: string
  deleted_at: any
}

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
];

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
const navigate                          = useNavigate();
const [uuid, setuuid]                   = useState("");
const [cve, setCve]                     = useState("");
const [descripcion, setDescripcion]     = useState("");
const [tipo, setTipo]                   = useState("");
const [paramstr, setParamStr]           = useState("");
const [paramint, setParamInt]           = useState("");
const [creadopor, setCreadoPor]         = useState("");
const [modificadopor, setModificadoPor] = useState("");
const [eliminadopor, setEliminadoPor]   = useState("");

// Abrir modal
const [open, setOpen]               = React.useState(false);
const handleOpen = ()   => setOpen(true);
const handleClose = ()  => setOpen(false);
  // Handle update
  const handleUpdate = () => {
    if (cve === "" || descripcion === "" || tipo === "" ){
      Swal.fire({
        icon  : "error",
        title : "Mensaje",
        text  : "Completa todos los campos para continuar ",
      });
    } else {
      //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
      const data = {
        uuid            : uuid,
        cve             : cve,
        descripcion     : descripcion,
        tipo            : tipo,
        paramstr        : paramstr,
        paramint         : paramint,
        creadopor       : creadopor,
        modificadopor   : localStorage.getItem("IdUsuario"),
        eliminadopor    : eliminadopor,
      };
      const url = "/administracion/actualizavalsistema";
      catalogoUpdate(data,url).then((response) =>{
        setOpen(false);
        getAllValoresSistema();
      })
    }
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
           <Tooltip title={"Editar " + cellValues.row.Cve}>
           <IconButton color="primary" 
              // al darle editar se llenan los campos con los valores seleccionados del renglon
              onClick={(event) => {     
                setuuid(cellValues.row.uuid);
                setCve(cellValues.row.Cve);
                setDescripcion(cellValues.row.Descripcion);
                setTipo(cellValues.row.Tipo.toString());
                setParamStr(cellValues.row.ParamStr);
                setParamInt(cellValues.row.ParamInt);
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
          </Box>
        );
      },
    },
    {
      field: "Cve",
      headerName: "Cve",
      width: 150,
      hideable: false,
      headerAlign: "left",
    },    
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 800,
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
            {cellValues.row.Tipo===1? "CADENA":cellValues.row.Tipo===2? "ENTERO":""}
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
  ];
 
const [rows, setRows] = useState([]);
const getAllValoresSistema = () => {
  axios({
    method    : "get",
    url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/administracion/obtienevalsistema",
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
    getAllValoresSistema();
  }, []);

  // esto es para que se limpien todas las variables al salir del modal
  // y que limpie las variables cuando se salga de la modal
  useEffect(() => {
    if (open===false) {
      setuuid("");
      setCve("");
      setDescripcion("");
      setTipo("");
      setParamStr("");
      setParamInt("");
    }
  }, [open]);  
 
  return (
    // contenedor principal
    <Grid container>
      {/* grid de Breadcrumbs */}
      <Grid sx={{}} item xs={12}>
        {/* ejemplo inicio/configuracion/catalogos/marca */}
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/Inicio">
            Inicio
        </Link>
        <Link underline="hover" color="inherit" href="/Inicio">
            Administración
        </Link>
          <Typography color="text.primary">Variables Sistema</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid container xs={12} justifyContent={"center"}>
        <Grid item xs={12} md={12} mt={2}>
          <Card sx={{ p: 1, boxShadow: 8 }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography  variant="h5" sx={{ paddingTop:"1%", paddingLeft:"1%" }}>Variables Sistema</Typography>
              </Grid>
              <Grid item xs={6} sx={{
                    display       : "flex",
                    alignItems    : "right",
                    justifyContent: "right",
                    paddingBottom : "2%",
                    paddingRight  : "1%",
              }}>
                <Button 
                  onClick={() => navigate(-1)}
                  color="secondary"
                  sx={{margin:"1%"}}
                  variant="contained">
                  <Typography
                    sx={{color: "#ffffff",
                    "&:hover":{color:"#15212f",},
                    fontFamily: "MontserratRegular, sans-serif",
                    fontSize: "100%",}}>
                    Cancelar
                  </Typography>
                </Button>  
              </Grid>
            </Grid>
            <CardContent sx={{ fontFamily: "MontserratBold", bgcolor: "" }}>
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
                          disabled  = {uuid!=="" ? true:false}
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
                          disabled  = {uuid!=="" ? true:false}
                          onChange  ={(v) => {setTipo(v.target.value); 
                                              setParamStr("");
                                              setParamInt("");}}
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
                    <Grid item xs={12}>
                      <Box
                        maxWidth      ="100%"
                        paddingTop    ={2}
                        paddingBottom ={2}
                        display       ="flex"
                        justifyContent="end"
                      >
                        <Button
                          onClick={() => {handleUpdate()} 
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
