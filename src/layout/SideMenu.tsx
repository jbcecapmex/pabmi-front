import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { Avatar, Divider, Typography } from "@mui/material";
import {
  AccountBalance,
  Add,
  AirportShuttle,
  Backup,
  Business,
  Checkroom,
  Code,
  ControlPoint,
  Dashboard,
  Description,
  Desk,
  DomainAddOutlined,
  EnhancedEncryption,
  Help,
  Home,
  ListAlt,
  Notifications,
  People,
  PersonAdd,
  PostAdd,
  Remove,
  Settings,
  ShowChart,
  SsidChart,
  StarBorderOutlined,
  SyncAlt,
  Task,
  TextIncrease,
  Traffic,
  Update,
  Warehouse,
  Work,
} from "@mui/icons-material";
import ChairIcon from '@mui/icons-material/Chair';
import { red } from "@mui/material/colors";
import palacio from "../assets/svg/palacio.svg";
import { useNavigate } from "react-router-dom";

const MenuSX = {
  color: "#212121",
  // selected and (selected + hover) states
  "&& .Mui-selected, && .Mui-selected:hover": {
    bgcolor: "#e57373",
    "&, & .MuiListItemIcon-root": { color: "#212121" },
  },
  // hover states
  "& .MuiListItemButton-root:hover": {
    bgcolor: "#e57373",
    "&, & .MuiListItemIcon-root": { color: "#ffffff" },
  },
};

export default function NestedList() {
  // Muebles
  const [openMuebles, setOpenMuebles] = React.useState(false);
  const handleClickMuebles = () => {
    setOpenMuebles(!openMuebles);
  };
  // Muebles2
  const [openMuebles2, setOpenMuebles2] = React.useState(false);
  const handleClickMuebles2 = () => {
    setOpenMuebles2(!openMuebles2);
  };
  // Inmuebles
  const [openInmuebles, setOpenInmuebles] = React.useState(false);
  const handleClickInmuebles = () => {
    setOpenInmuebles(!openInmuebles);
  };
  // Tickets
  const [openTickets, setOpenTickets] = React.useState(false);
  const handleClickTickets = () => {
    setOpenTickets(!openTickets);
  };
  // Reportes
  const [openReportes, setOpenReportes] = React.useState(false);
  const handleClickReportes = () => {
    setOpenReportes(!openReportes);
  };
  // Administracion
  const [openAdministracion, setOpenAdministracion] = React.useState(false);
  const handleClickAdministracion = () => {
    setOpenAdministracion(!openAdministracion);
  };
  // Configuracion
  const [openConfiguracion, setOpenConfiguracion] = React.useState(false);
  const handleClickConfiguracion = () => {
    setOpenConfiguracion(!openConfiguracion);
  };
  // Vehiculos
  const [openVehiculos, setOpenVehiculos] = React.useState(false);
  const handleClickVehiculos = () => {
    setOpenVehiculos(!openVehiculos);
  };

  const [itemSelected, setItemSelected] = React.useState(0);
  const navigate = useNavigate();

  return (
    // box del sidemenu
    <Box
      sx={{ width: "90%", top: "6vh", position: "absolute" }}
    >
      {/* box del palacio */}
      <Box sx={{ display: "flex", justifyContent: "center", height: "11vh" }}>
        <img src={palacio} alt="Logo" width="200" height="100" />
      </Box>
      {/* box del avatar */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ fontSize: 34, bgcolor: red[300], p: 3 }}>NT</Avatar>
      </Box>      
      {/* nombre */}
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {localStorage.getItem("NombreUsuario") || "NombreUsuario"}
      </Typography>
      {/* Puesto */}
      <Typography
        variant="subtitle1"
        component="div"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
        }}
      >
      {localStorage.getItem("Puesto") || "Puesto"}
      </Typography>

      <Divider />
      <List sx={MenuSX}>
        {/* Inicio */}
        <ListItemButton
          component="a"
          href="/"
          divider
          selected={itemSelected === 0 ? true : false}
          onClick={() => {setItemSelected(0); navigate("/");}}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>

        {/* Bienes Muebles */}
        <ListItemButton
          onClick={() => {
            setItemSelected(10);
            navigate("/muebles/listamuebles");
            handleClickMuebles();
          }}
          divider
          selected={itemSelected === 10 ? true : false}
        >
          <ListItemIcon>
            <ChairIcon />
          </ListItemIcon>
          <ListItemText primary="Muebles " />
          {openMuebles ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMuebles} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => {
                setItemSelected(101);                
                handleClickMuebles2();                
              }}
              divider
              selected={itemSelected === 101 ? true : false}
            >
              <ListItemIcon sx={{ pl: 4 }}>
                <Desk />
              </ListItemIcon>
              <ListItemText primary="Almacén MyE" />
              {openMuebles2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMuebles2} timeout="auto" unmountOnExit>
              {/* ADJUDICACIONES */}
              <ListItemButton
                selected={itemSelected === 111 ? true : false}
                onClick={() => {setItemSelected(111); navigate("/muebles/adjudicaciones");}}

                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <Warehouse />
                </ListItemIcon>
                <ListItemText primary="Adjudicaciones" />
              </ListItemButton>
              {/* ALTAS */}
              <ListItemButton
                selected={itemSelected === 112 ? true : false}
                onClick={() => {setItemSelected(112); navigate("/muebles/altas");}}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primary="Altas" />
              </ListItemButton>
              {/* ARRENDAMIENTOS */}
              <ListItemButton
                selected={itemSelected === 113 ? true : false}
                onClick={() => {setItemSelected(113); navigate("/muebles/arrendamientos");}}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <Checkroom />
                </ListItemIcon>
                <ListItemText primary="Arrendamientos" />
              </ListItemButton>
              {/* BAJAS */}
              <ListItemButton
                selected={itemSelected === 114 ? true : false}
                onClick={() => {setItemSelected(114); navigate("/muebles/bajas");}}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <EnhancedEncryption />
                </ListItemIcon>
                <ListItemText primary="Bajas" />
              </ListItemButton>
              {/* COMODATO */}
              <ListItemButton
                selected={itemSelected === 115 ? true : false}
                onClick={() => {setItemSelected(115); navigate("/muebles/comodato");}}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <SyncAlt />
                </ListItemIcon>
                <ListItemText primary="Comodato" />
              </ListItemButton>
              {/* DONACIONES */}
              <ListItemButton
                selected={itemSelected === 116 ? true : false}
                onClick={() => {setItemSelected(116); navigate("/muebles/donaciones");}}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <Remove />
                </ListItemIcon>
                <ListItemText primary="Donaciones" />
              </ListItemButton>
              {/* INVENTARIOS */}
              <ListItemButton
                selected={itemSelected === 117 ? true : false}
                onClick={() => {setItemSelected(117); navigate("/muebles/inventarios");}}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <TextIncrease />
                </ListItemIcon>
                <ListItemText primary="Inventarios" />
              </ListItemButton>
              {/* RESGUARDOS */}
              <ListItemButton
                selected={itemSelected === 118 ? true : false}
                onClick={() => {setItemSelected(118); navigate("/muebles/resguardos");}}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <TextIncrease />
                </ListItemIcon>
                <ListItemText primary="Resguardos" />
              </ListItemButton>
              {/* TRANSFERENCIAS */}
              <ListItemButton
                selected={itemSelected === 119 ? true : false}
                onClick={() => {setItemSelected(119); navigate("/muebles/transferencias");}}
                sx={{ pl: 8 }}
              >
                <ListItemIcon>
                  <TextIncrease />
                </ListItemIcon>
                <ListItemText primary="Transferencias" />
              </ListItemButton>
            </Collapse>

            <ListItemButton
              onClick={() => {
                setItemSelected(201);
                handleClickVehiculos();
              }}
              divider
              selected={itemSelected === 201 ? true : false}
            >
              <ListItemIcon sx={{ pl: 4 }}>
                <AirportShuttle />
              </ListItemIcon>
              <ListItemText primary="Vehículos" />
              {openVehiculos ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openVehiculos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  selected={itemSelected === 221 ? true : false}
                  onClick={() => {setItemSelected(221); navigate("/vehiculos/opcion1");}}
                  sx={{ pl: 8 }}
                >
                  <ListItemIcon>
                    <StarBorderOutlined />
                  </ListItemIcon>
                  <ListItemText primary="opcion1" />
                </ListItemButton>

                <ListItemButton
                  selected={itemSelected === 222 ? true : false}
                  onClick={() => {setItemSelected(222); navigate("/vehiculos/opcion2");}}
                  sx={{ pl: 8 }}
                >
                  <ListItemIcon>
                    <SsidChart />
                  </ListItemIcon>
                  <ListItemText primary="opcion2" />
                </ListItemButton>

              </List>
            </Collapse>
          </List>
        </Collapse>

        {/* Inmuebles */}
        <ListItemButton
          onClick={() => {
            setItemSelected(30);
            handleClickInmuebles();
          }}
          divider
          selected={itemSelected === 30 ? true : false}
        >
          <ListItemIcon>
            <Business />
          </ListItemIcon>
          <ListItemText primary="Bienes Inmuebles " />
          {openInmuebles ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openInmuebles} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={itemSelected === 31 ? true : false}
              onClick={() => {setItemSelected(31); navigate("/inmuebles/alta");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="Alta" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 32 ? true : false}
              onClick={() => {setItemSelected(32); navigate("/inmuebles/baja");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Remove />
              </ListItemIcon>
              <ListItemText primary="Baja" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 33 ? true : false}
              onClick={() => {setItemSelected(33); navigate("/inmuebles/modificacion");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Update />
              </ListItemIcon>
              <ListItemText primary="Modificación" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 34 ? true : false}
              onClick={() => {setItemSelected(34); navigate("/inmuebles/arrendamiento");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Arrendamiento" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 35 ? true : false}
              onClick={() => {setItemSelected(35); navigate("/inmuebles/comodato");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <DomainAddOutlined />
              </ListItemIcon>
              <ListItemText primary="Comodato" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Tickets */}
        <ListItemButton
          onClick={() => {
            setItemSelected(40);
            handleClickTickets();
            navigate("/tickets/ticketsdashboard");
          }}
          divider
          selected={itemSelected === 40 ? true : false}
        >
          <ListItemIcon>
            <Task />
          </ListItemIcon>
          <ListItemText primary="Tickets " />
          {/* {openTickets ? <ExpandLess /> : <ExpandMore />} */}
        </ListItemButton>

        {/* Reportes */}
        <ListItemButton
          onClick={() => {
            setItemSelected(50);
            handleClickReportes();
          }}
          divider
          selected={itemSelected === 50 ? true : false}
        >
          <ListItemIcon>
            <ShowChart />
          </ListItemIcon>
          <ListItemText primary="Reportes " />
          {openReportes ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openReportes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={itemSelected === 51 ? true : false}
              onClick={() => {setItemSelected(51); navigate("/reportes/dashboard");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 52 ? true : false}
              onClick={() => {setItemSelected(52); navigate("/reportes/generales");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <SsidChart />
              </ListItemIcon>
              <ListItemText primary="Generales   " />
            </ListItemButton>
          </List>
        </Collapse>

        {/* <Divider />
            <Box  sx={{width: 360,height: 150,backgroundColor: 'primary.dark','&:hover': {backgroundColor: 'primary.main',opacity: [0.9, 0.8, 0.7],},}} /> */}

        {/* Administracion */}
        <ListItemButton
          onClick={() => {
            setItemSelected(60);
            handleClickAdministracion();
          }}
          divider
          selected={itemSelected === 60 ? true : false}
        >
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Administración " />
          {openAdministracion ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAdministracion} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={itemSelected === 61 ? true : false}
              onClick={() => {setItemSelected(61); navigate("/administracion/valoresglobales");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <ControlPoint />
              </ListItemIcon>
              <ListItemText primary="Valores Globales" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 62 ? true : false}
              onClick={() => {setItemSelected(62); navigate("/administracion/notificaciones");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Notificaciones" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 63 ? true : false}
              onClick={() => {setItemSelected(63); navigate("/administracion/cronjobs");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="CronJobs" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 64 ? true : false}
              onClick={() => {setItemSelected(64); navigate("/administracion/semaforizacion");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Traffic />
              </ListItemIcon>
              <ListItemText primary="Semaforización" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 65 ? true : false}
              onClick={() => {setItemSelected(65); navigate("/administracion/backup");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Backup />
              </ListItemIcon>
              <ListItemText primary="BackUp" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 66 ? true : false}
              onClick={() => {setItemSelected(66); navigate("/administracion/valoressitema");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Code />
              </ListItemIcon>
              <ListItemText primary="Valores del Sistema" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 67 ? true : false}
              onClick={() => {setItemSelected(67); navigate("/administracion/ayuda");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="Ayuda" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Configuracion */}
        <ListItemButton
          onClick={() => {
            setItemSelected(70);
            handleClickConfiguracion();
          }}
          divider
          selected={itemSelected === 70 ? true : false}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configuración " />
          {openConfiguracion ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openConfiguracion} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={itemSelected === 71 ? true : false}
              onClick={() => {setItemSelected(71); navigate("/configuracion/catalogos");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <PostAdd />
              </ListItemIcon>
              <ListItemText primary="Catálogos" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 72 ? true : false}
              onClick={() => {setItemSelected(72); navigate("/configuracion/usuarios");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
            <ListItemButton
              selected={itemSelected === 73 ? true : false}
              onClick={() => {setItemSelected(73); navigate("/configuracion/roles");}}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Salir */}
        <ListItemButton
          onClick={() => {
            localStorage.clear();
            window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN!);
          }}
          divider
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItemButton>        
      </List>
    </Box>
  );
}
