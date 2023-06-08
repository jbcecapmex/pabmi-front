import React, { useEffect, useState } from "react";
import {AppBar,Badge,Box,Drawer,Grid,IconButton,Menu,MenuItem,Toolbar,Typography, useMediaQuery,} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Email, Notifications } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import SideMenu from "./SideMenu";
import { grey} from "@mui/material/colors";
import axios from "axios";
import Swal from "sweetalert2";

// ancho del drawer
const drawerWidth = 300;
const ColorGris = grey[600];

function NavBar(props: { children?: any; window?: any }) {
  // obtener los milisegundos con los cuales se iba a revisar si hay mensajes nuevos
  const [timermsg, setTimerMsg] = useState(5000);
  useEffect(() => {    
      getTimerMsg();    
  }, []);  

  const [messagenuevos, setMessageNuevos] = useState('');
  useEffect(() => {
    const intervalId = setInterval(() => {
      getNewMsg();      
    }, timermsg); // Repeat every 50 seconds
    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);

  const navigate = useNavigate();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const auth = true;

  // esto es de la parte de submenus de los iconos de mensaje y notificaciones
  const [anchorAlerta, setAnchorAlerta] = useState<null | HTMLElement>(null);
  const handleMenuAlerta = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAlerta(event.currentTarget);
  };
  const handleCloseAlerta = () => {
    setAnchorAlerta(null);
  };


  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerNotificationOpen, setIsDrawerNotificationOpen] = useState(false);
  const query = {
    isXs: useMediaQuery("(min-width: 0px) and (max-width: 1025px)"),
  };
  // const container = window !== undefined ? () => window().document.body : undefined;


// declaracion de la variable de estado "hook" que recibira la informacion del endpoint
  const getTimerMsg = () => {
    //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
    const data = {
      modulo    :  "ADMINISTRACIÓN",
      cve       : "timmsg",
    };
    axios({
      method    : "post",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/administracion/detallevalores",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
      data    : data,
    })
      // aqui se recibe lo del endpoint en response
      .then(({ data }) => {
        const rows = data[0];
        console.log(rows);
        setTimerMsg(rows.ParamInt);
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
  const getNewMsg = () => {
    //aqui se arma el body que se va a enviar al endpoint los campos se deben llamar exactamente igual a como se envian al endpoint en insomia (minusculas)
    const data = {
      // asignadoa         :  "a4f79e57-32b7-11ed-aed0-040300000000",
      asignadoa         : localStorage.getItem("IdUsuario"),
    };
    axios({
      method    : "post",
      url       : process.env.REACT_APP_APPLICATION_ENDPOINT + "/mensajes/mensajesnuevos",
      headers   : {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwtToken") || "",
      },
      data    : data,
    })
      // aqui se recibe lo del endpoint en response
      .then(({ data }) => {
        const rows = data;
        setMessageNuevos(rows);
      })
      .catch(function (error) {
        Swal.fire({
          icon  : "error",
          title : "Mensaje",
          text  : "("+error.response.status+") "+error.response.data.message,
        }).then((r) => navigate("/Mensajes/Mensajes"));
      });
  };  
  // no se como cambiar esto
  if (auth)
    return (      
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="absolute"
          // ancho del appbar
          sx={{
            width: '100vw',
            height: '6vh',
            bgcolor: ColorGris, //color del appbar
            
          }}
        >
          <Toolbar variant="dense">
            <Grid
              container
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <i className="fa-solid fa-bars" />
            </Grid>
            <Typography  component="div" sx={{ flexGrow: 1, fontFamily: "MontserratRegular, sans-serif",fontSize: "130%" }}>
              Plataforma de Administración de Bienes Muebles e Inmuebles 
            </Typography>
            {/* menu de mensajes */}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={()=> navigate("/Mensajes")}
                color="inherit"
              >
                <Badge badgeContent={messagenuevos} color="primary">
                  <Email />
                </Badge>                
              </IconButton>     
              
            </div>
            {/* menu de notificaciones */}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuAlerta}
                color="inherit"
              >
                <Grid item container direction="column" mt={2}>
                  <SideMenu />
                </Grid>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                zIndex: 1,
              },
            }}
            open
          >
            <SideMenu />
          </Drawer>
        {/* fondo de pantalla del centro */}
        
        <Box component="main"
         sx={{ flexGrow: 1, paddingTop:2, paddingBottom:4, paddingLeft:4, width:'76vw',top:'7vh', position:'absolute',left:'18vw', }}>
          {/* <Toolbar /> */}
          {props.children}
        </Box>
      </Box>
    );
  else
    return <div>{props.children}</div>;
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
