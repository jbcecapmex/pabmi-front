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

function NavMessages(props: { children?: any; window?: any }) {
  const [timermsg, setTimerMsg] = useState(5000);
  useEffect(() => {    
      getTimerMsg();    
  }, []);  

  const [messagenuevos, setMessageNuevos] = useState('');
  useEffect(() => {
    const intervalId = setInterval(() => {
      getNewMsg();      
    }, timermsg); 
    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const auth = true;

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

  const getTimerMsg = () => {
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
  
  const getNewMsg = () => {
    const data = {
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
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={()=> navigate("/Mensajes")}
        color="inherit"
      >
        <Badge badgeContent={messagenuevos} color="secondary">
          <Email />
        </Badge>                
      </IconButton>    
    );
  else
    return <div>{props.children}</div>;
}

NavMessages.propTypes = {
  window: PropTypes.func,
};

export default NavMessages;
