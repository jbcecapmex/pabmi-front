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
    bgcolor: "#e57373",
    "&, & .MuiButton-root": { color: "#212121" },
  },
  // cuando pasas el mouse sobre
  "& .MuiButton-root:hover": {
    bgcolor: "#e57373",
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
    <Box sx={{ width: "100%", height: "100%", paddingBottom:"2%", paddingLeft:"2%"}}>
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
            <Grid item xs={12} md={10} mt={2}>
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
                          backgroundColor: "#e57373",
                          heigth: 4,
                        },
                        "& .Mui-selected": { color: "#e57373" },
                        "& button": { borderRadius: 5 },
                        // pasa el mouse
                        "& button:hover": {
                          backgroundColor: "#e57373",
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
                          onClick={() => {
                            changeScreen(1, "Empleados");
                            setShowCatGrid(true);
                          }}
                        >
                          EMPLEADOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(2, "Domicilios");
                            setShowCatGrid(true);
                          }}
                        >
                          DOMICILIOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(3, "Edificios");
                            setShowCatGrid(true);
                          }}
                        >
                          EDIFICIOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(4, "Secretarias");
                            setShowCatGrid(true);
                          }}
                        >
                          SECRETARIAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(5, "Dependencias");
                            setShowCatGrid(true);
                          }}
                        >
                          DEPENDENCIAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(6, "Tipos de Dependencias");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPO DE DEPENDENCIAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(6, "Tipos de Dependencias");
                            setShowCatGrid(true);
                          }}
                        >
                          ENTIDADES FEDERATIVAS
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(6, "Tipos de Dependencias");
                            setShowCatGrid(true);
                          }}
                        >
                          MUNICIPIOS
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(6, "Tipos de Dependencias");
                            setShowCatGrid(true);
                          }}
                        >
                          PUESTOS
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          href="/Configuracion/Catalogos/TipodeClasificacion"
                        >
                          TIPO DE CLASIFICACIÓN
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
                          onClick={() => {
                            setCatSelected(1);
                            changeScreen(8, "Secretarias");
                            setShowCatGrid(true);
                          }}
                        >
                          SECRETARIAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(9, "Dependencias");
                            setShowCatGrid(true);
                          }}
                        >
                          DEPENDENCIAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(10, "Presentación Muebles");
                            setShowCatGrid(true);
                          }}
                        >
                          PRESENTACIÓN MUEBLES
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(11, "Tipos de Activo");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPOS DE ACTIVO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(12, "Lineas");
                            setShowCatGrid(true);
                          }}
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
                            changeScreen(13, "Tipos de Comprobantes");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPOS DE COMPROBANTES
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
                          onClick={() => {
                            changeScreen(15, "Tipos de Adquisición");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPOS DE ADQUISICIÓN
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(16, "Motivos de Baja");
                            setShowCatGrid(true);
                          }}
                        >
                          MOTIVOS DE BAJA
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(17, "Marca");
                            setShowCatGrid(true);
                          }}
                        >
                          MARCAS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(18, "Modelos");
                            setShowCatGrid(true);
                          }}
                        >
                          MODELOS
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
                          onClick={() => {
                            changeScreen(19, "Tipos de Vialidad");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPOS DE VIALIDAD
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(20, "Tipos de Asentamiento");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPOS DE ASENTAMIENTO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(21, "Entidad Federativa");
                            setShowCatGrid(true);
                          }}
                        >
                          ENTIDAD FEDERATIVA
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(22, "Naturaleza del Inmueble");
                            setShowCatGrid(true);
                          }}
                        >
                          NATURALEZA DEL INMUEBLE
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(23, "Carácter del Monumento");
                            setShowCatGrid(true);
                          }}
                        >
                          CARÁCTER DE MONUMENTO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(24, "Tipos de Inmueble");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPO DE INMUEBLE
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(25, "Proveedor de Avalúo");
                            setShowCatGrid(true);
                          }}
                        >
                          POROVEEDOR DE AVALÚO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(26, "Operación que da Origen");
                            setShowCatGrid(true);
                          }}
                        >
                          OPERACIÓN QUE DA ORIGEN
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(27, "Título");
                            setShowCatGrid(true);
                          }}
                        >
                          TÍTULO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(28, "Situación del Inmueble");
                            setShowCatGrid(true);
                          }}
                        >
                          SITUACIÓN DEL INMUEBLE
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(29, "Modificación del Título");
                            setShowCatGrid(true);
                          }}
                        >
                          MODIFICACIÓN DEL TÍTULO
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(30, "Tipos de Instrumento");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPOS DE INSTRUMENTOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(31, "Tipos de Contraparte");
                            setShowCatGrid(true);
                          }}
                        >
                          TIPOS DE CONTRAPARTE
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(32, "Estatus de Instrumentos");
                            setShowCatGrid(true);
                          }}
                        >
                          ESTATUS DE INSTRUMENTOS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(33, "Solicitado Por");
                            setShowCatGrid(true);
                          }}
                        >
                          SOLICITADO POR
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(34, "Motivos de Alta");
                            setShowCatGrid(true);
                          }}
                        >
                          MOTIVOS DE ALTA
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(35, "Motivos de Baja");
                            setShowCatGrid(true);
                          }}
                        >
                          MOTIVOS DE BAJA
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(36, "Motivos de Modificación");
                            setShowCatGrid(true);
                          }}
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
        </Grid>
      )}
    </Box>
  );
};

export default Catalogos;
