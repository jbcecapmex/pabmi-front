/* pantalla principal donde se enlistan los catalogos */
import { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import CatGrid from "./CatGrid";

// definicio de como se comporta al pasar y seleccionar un boton de la pantalla
const MenuSX = {
  // cuando seleccionas una opcion
  "&& .Mui-selected, && .Mui-selected:hover": {
    bgcolor: "#bda889",
    "&, & .MuiButton-root": { color: "#212121" },
  },
  // cuando pasas el mouse sobre
  "& .MuiButton-root:hover": {
    bgcolor: "#bda889",
    "&, & .MuiButton-root": { color: "#ffffff" },
  },
};
// definicio del color del texto de los botones de catalogos
const ButtonSX = { color: "black" };

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//funcion principal
const Catalogos = () => {
  const [panelValue, setPanelValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setPanelValue(newValue);
  };
  // saber el id del catalogo seleccionado
  const [CatSelected, setCatSelected] = useState(0);
  // saber el titulo del catalogo que se selecciono
  const [tituloCatalogo, setTituloCatalogo] = useState("");
  // mostrar la pantalla del catgrid
  const [showCatGrid, setShowCatGrid] = useState(false);

  // cambiar el valor de la bandera para dejar de mostrar la pantalla con grid
  const muestraprincipal = () => {
    setShowCatGrid(false);
  };

  // variables que se le pasarian a la pantalla del grid para identificar que catalogo se selecciono
  const changeScreen = (cat: number, titulo: string) => {
    setCatSelected(cat);
    setTituloCatalogo(titulo);
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", height: "100%", paddingBottom: "2%", paddingLeft: "2%" }}>
      {showCatGrid ? (
        // manda llamar la pantalla donde esta el grid de los catalogos
        <CatGrid
          cat={CatSelected}
          titulo={tituloCatalogo}
          regresa={muestraprincipal}
        />
      ) : (
        <Grid container>
          <Grid sx={{}} item xs={12}>
            {/* arma ruta de donde esta ubicado */}
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/Home">
                Inicio
              </Link>
              <Link underline="hover" color="inherit" href="/Configuracion">
                Configuración
              </Link>
              <Typography color="text.primary">Catálogos</Typography>
            </Breadcrumbs>
          </Grid>

          {/* grid que contiene el recuadro donde estan los catalogos */}
          <Grid container xs={12} justifyContent={"center"}>
            <Grid item xs={12} md={12} mt={2}>
              <Card sx={{ p: 1, boxShadow: 8 }}>
                <CardHeader
                  title="Catálogos"
                  subheader="Catálogos de Bienes Patrimoniales"
                />
                <CardContent>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={panelValue}
                      onChange={handleChange}
                      textColor="inherit"
                      variant="fullWidth"
                      // este SX es de la barra donde se muestran los tabs
                      sx={{
                        "& .MuiTabs-indicator": {
                          backgroundColor: "#bda889",
                          heigth: 4,
                        },
                        "& .Mui-selected": { color: "#bda889" },
                        "& button": { borderRadius: 5 },
                        // pasa el mouse
                        "& button:hover": {
                          backgroundColor: "#bda889",
                          color: "#ffffff",
                        },
                        // se queda seleccionado
                        // "& button:focus": { backgroundColor:"green" },
                        //  momento del click
                        //  "& button:active": { backgroundColor:"gold" },
                      }}
                    >
                      <Tab label="Generales" {...a11yProps(0)} />
                      <Tab label="Bienes Muebles" {...a11yProps(1)} />
                      <Tab label="Bienes Inmuebles" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  {/* panel de generales */}
                  <TabPanel value={panelValue} index={0}>
                    <Grid sx={MenuSX} container spacing={2}>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Empleados")}
                        >
                          EMPLEADOS
                        </Button>
                      </Grid>
                      {/* <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          href="/Configuracion/Catalogos/Domicilios"
                        >
                          DOMICILIOS
                        </Button>
                      </Grid> */}

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Secretarias")}
                        >
                          SECRETARÍAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Dependencias")}
                        >
                          DEPENDENCIAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/TipoDependencias")}
                        >
                          TIPO DE DEPENDENCIAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/EntidadesFederativas")}
                        >
                          ENTIDADES FEDERATIVAS
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Municipios")}
                        >
                          MUNICIPIOS
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Puestos")}
                        >
                          PUESTOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/TipodeClasificacion")}
                        >
                          TIPO DE CLASIFICACIÓN
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Notificaciones")}
                        >
                          NOTIFICACIONES
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Procesos")}
                        >
                          PROCESOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/ReportesC")}
                        >
                          Reportes
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/NivelReportes")}
                        >
                          NIVEL DE REPORTES
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Transacciones")}
                        >
                          TRANSACCIONES
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Titular")}
                        >
                          TITULAR
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Area")}
                        >
                          AREA
                        </Button>
                      </Grid>                      


                    </Grid>
                  </TabPanel>

                  {/* panel de muebles */}
                  <TabPanel value={panelValue} index={1}>
                    <Grid sx={MenuSX} container spacing={2}>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/PresentacionMuebles")}
                        >
                          PRESENTACIÓN MUEBLES
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                      <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          // ref="/Configuracion/Catalogos/TipoActivoFijo"                          
                          onClick={()=> navigate("/Configuracion/Catalogos/TipoActivoFijo")}
                        >
                          TIPOS DE ACTIVO FIJO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Linea")}
                        >
                          LINEAS
                        </Button>
                      </Grid>  
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(14, "Activo");
                            setShowCatGrid(true);
                          }}
                        >
                          ACTIVO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Activo")}
                        >
                          ACTIVO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/TipoBien")}
                        >
                          TIPO DE BIEN
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/TipoComprobante")}
                        >
                          TIPO DE COMPROBANTE
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/TipoProceso")}
                        >
                          TIPO DE PROCESO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/TipoProveedor")}
                        >
                          TIPO DE PROVEEDOR
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/TipoReporte")}
                        >
                          TIPO DE REPORTES
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/TipoTransaccion")}
                        >
                          TIPO DE TRANSACCIÓN
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/MotivosBaja")}
                        >
                          MOTIVOS DE BAJA
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Marcas")}
                        >
                          MARCAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/Modelos")}
                        >
                          MODELOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("/Configuracion/Catalogos/EstatusResguardos")}
                        >
                          ESTATUS DE RESGUARDOS
                        </Button>
                      </Grid>
                    </Grid>
                  </TabPanel>

                  {/* panel de inmuebles */}
                  <TabPanel value={panelValue} index={2}>
                    <Grid sx={MenuSX} container spacing={2}>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          TIPOS DE VIALIDAD
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          TIPOS DE ASENTAMIENTO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          ENTIDAD FEDERATIVA
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          NATURALEZA DEL INMUEBLE
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          CARÁCTER DE MONUMENTO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          TIPO DE INMUEBLE
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          POROVEEDOR DE AVALÚO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          OPERACIÓN QUE DA ORIGEN
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          TÍTULO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          SITUACIÓN DEL INMUEBLE
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          MODIFICACIÓN DEL TÍTULO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          TIPOS DE INSTRUMENTOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          TIPOS DE CONTRAPARTE
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          ESTATUS DE INSTRUMENTOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          SOLICITADO POR
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          MOTIVOS DE ALTA
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          MOTIVOS DE BAJA
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={()=> navigate("")}
                        >
                          MOTIVOS DE MODIFICACIÓN
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(37, "Uso Temporal");
                            setShowCatGrid(true);
                          }}
                        >
                          USO TEMPORAL
                        </Button>
                      </Grid>

                    </Grid>
                  </TabPanel>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid >
      )}
    </Box >
  );
};

export default Catalogos;
