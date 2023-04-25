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
import CatGrid from "../Catalogos/CatGrid";

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



const Usuarios = () => {
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
    <Box sx={{ width: "100%", height: "100%", padding:"2%" }}>
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
              <Typography color="text.primary">Usuarios</Typography>
            </Breadcrumbs>
          </Grid>

          {/* grid que contiene el recuadro donde estan los catalogos */}
          <Grid container xs={12} justifyContent={"center"}>
            <Grid item xs={12} md={10} mt={2}>
              <Card sx={{ p: 1, boxShadow: 8 }}>
                <CardHeader
                  title="Usuarios"
                  subheader="Catálogos de usuarios"
                />
                <CardContent>
                  <Box sx={{ maxWidth:'200px',borderBottom: 1, borderColor: "divider" }}>
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
                          USUARIOS
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
                          PERFILES
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
                          ROLES
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          onClick={() => {
                            changeScreen(4, "Direcciones Generales");
                            setShowCatGrid(true);
                          }}
                        >
                          MENUS
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          sx={ButtonSX}
                          variant="text"
                          fullWidth
                          href="/Configuracion/Catalogos/Permisos"
                        >
                          PERMISOS
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


export default Usuarios;

