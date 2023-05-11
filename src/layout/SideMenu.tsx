import React from "react";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { Avatar, Divider, Typography } from "@mui/material";
import { Icons } from "../layout/Icons";
import { red } from "@mui/material/colors";
import palacio from "../assets/svg/palacio.svg";
import { useNavigate } from "react-router-dom";
import { menu } from "../componentes/Json/Menu";
import Button from '@mui/material/Button';
import { logoutapp } from "../services/Validation";
const MenuSX = {
  color: "#212121",
  // selected and (selected + hover) states
  "&& .Mui-selected, && .Mui-selected:hover": {
    bgcolor: "#bda889",
    "&, & .MuiListItemIcon-root": { color: "#212121" },
  },
  // hover states
  "& .MuiListItemButton-root:hover": {
    bgcolor: "#bda889",
    "&, & .MuiListItemIcon-root": { color: "#ffffff" },
  },
};

export default function NestedList() {
  // Muebles
  const [openSegundo, setOpenSegundo] = useState(0); // esta es una variable de estado
  const handleOpenCollapse = (id: number) => {
    setOpenSegundo(id);
  };

  const [openTercer, setOpenTercer] = useState(0);
  const handleOpenCollapseTercer = (id: number) => {
    setOpenTercer(id);
  };

  const [itemSelected, setItemSelected] = useState(0);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [rolUsuario, setRolUsuario] = useState("");
  const navigate = useNavigate();

  const AvatarUsuario = (nombre: string) => {
    var iniciales = "";
    if(!nombre){
      return iniciales;
    }
    if(nombre.length>1){
      var nombres: Array<string>= nombre.split(" ");
      iniciales = nombres[0].charAt(0)+nombres[1].charAt(0);
    } else {
      iniciales = nombre[0].charAt(0)+nombre[0].charAt(1);
    }
    return iniciales.toUpperCase();
  }

  useEffect(() => {
    if(!localStorage.getItem("NombreUsuario")){
      setTimeout(() => {
        setNombreUsuario(localStorage.getItem("NombreUsuario")!) 
        setRolUsuario(localStorage.getItem("RolUsuario")!) 
      }, 1000);
    } else {
      setNombreUsuario(localStorage.getItem("NombreUsuario")!) 
      setRolUsuario(localStorage.getItem("RolUsuario")!) 
    }
  }, [])

  return (
    // box del sidemenu
    <Box sx={{ width: "90%", top: "6vh", position: "absolute" }}>
      {/* box del palacio */}
      <Box sx={{ display: "flex", justifyContent: "center", height: "11vh" }}>
        <img src={palacio} alt="Logo" width="200" height="100" />
      </Box>
      {/* box del avatar */}
      <Box sx={{ display: "flex", justifyContent: "center", paddingBottom:2}}>
        <Avatar sx={{ fontSize: 34, bgcolor:"#bda889", p: 3 }}>
          {AvatarUsuario(nombreUsuario!)}
        </Avatar>
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
        {nombreUsuario!}
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
        {rolUsuario}
      </Typography>

      <Divider />
      <List sx={MenuSX}>
        {/** Este fragmento de código es del botón de inicio que siempre estara en cualquier menu */}
        <ListItemButton
          onClick={() => {
            setItemSelected(0);
            navigate("/");
          }}
          divider
          selected={itemSelected === 0 ? true : false}
        >
          <ListItemIcon sx={{ color:"#bda889" }}>{Icons("Home")}</ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
        {/** Termina el fragmento de código es del botón de inicio que siempre estara en cualquier menu */}

        {menu.map((element: any, nombre) => {
          return (
            <div key={nombre}>
              <ListItemButton
                onClick={() => {
                  if (openSegundo !== element.id) {
                    setItemSelected(element.id);
                    handleOpenCollapse(element.id);
                  } else {
                    setItemSelected(900);
                    handleOpenCollapse(900);
                  }
                }}
                divider
                selected={itemSelected === element.id ? true : false}
              >
                <ListItemIcon sx={{ color:"#bda889" }} >{Icons(element.icon)}</ListItemIcon>
                <ListItemText primary={element.nombre} />
                {openSegundo ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              {
                element?.submenu &&
                  <Collapse
                    in={openSegundo === element.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {element.submenu.map((subel: any, index: number) => {
                        return (
                          <div key={subel.nombre}>
                            <ListItemButton
                              onClick={() => {
                                setItemSelected(subel.id);
                                handleOpenCollapseTercer(subel.id);
                                navigate(subel.ruta);
                              }}
                              divider
                              selected={itemSelected === subel.id ? true : false}
                            >
                              <ListItemIcon sx={{ pl: 4,  color:"#bda889" }}>
                                {Icons(subel.icon)}
                              </ListItemIcon>
                              <ListItemText primary={subel.nombre} />
                              {openTercer ? <ExpandLess /> : <ExpandMore />} {/* Hay que poner una regla para que no siempre aparesca el signo hacia abajo cuando ya no tiene mas sub menus */}
                            </ListItemButton>

                            {subel?.submenuTercerNivel && (
                              <Collapse
                                in={openTercer === subel.id}
                                timeout="auto"
                                unmountOnExit
                              >
                                <List component="div" disablePadding>
                                  {subel?.submenuTercerNivel.map(
                                    (tercer: any) => {
                                      return (
                                        <ListItemButton
                                        
                                          onClick={() => {
                                            setItemSelected(tercer.id);
                                            navigate(tercer.ruta);
                                          }}
                                          divider
                                          selected={
                                            itemSelected === tercer.id
                                              ? true
                                              : false
                                          }
                                        >
                                          <ListItemIcon sx={{ pl: 8,  color:"#bda889" }}>
                                            {Icons(tercer.icon)}
                                          </ListItemIcon>
                                          <ListItemText primary={tercer.nombre} />
                                        </ListItemButton>
                                      );
                                    }
                                  )}
                                </List>
                              </Collapse>
                            )}
                          </div>
                        );
                      })}
                    </List>
                  </Collapse>
              }
            </div>
          );
        })}

        {/** Este fragmento de código es del botón de Salir que siempre estara en cualquier menu */}
        <ListItemButton
          onClick={() => {
            logoutapp();
          }}
          divider
        >
          <ListItemIcon sx={{ color:"#bda889" }} >{Icons("ExitToApp")}</ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItemButton>
        {/** Este fragmento de código es del botón de Salir que siempre estara en cualquier menu */}
      </List>
    </Box>
  );
}
