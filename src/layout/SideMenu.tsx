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
  const [openSegundo, setOpenSegundo] = useState(0); // esta es una variable de estado
  const handleOpenCollapse = (id: number) => {
    setOpenSegundo(id);
  };

  const [openTercer, setOpenTercer] = useState(0);
  const handleOpenCollapseTercer = (id: number) => {
    setOpenTercer(id);
  };

  const [itemSelected, setItemSelected] = useState(0);
  const navigate = useNavigate();

  return (
    // box del sidemenu
    <Box sx={{ width: "90%", top: "6vh", position: "absolute" }}>
      {/* box del palacio */}
      <Box sx={{ display: "flex", justifyContent: "center", height: "11vh" }}>
        <img src={palacio} alt="Logo" width="200" height="100" />
      </Box>
      {/* box del avatar */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ fontSize: 34, bgcolor: red[300], p: 3 }}>RU</Avatar>
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
        Usuario
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
        Rol del Usuario
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
          <ListItemIcon>{Icons("Home")}</ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
        {/** Termina el fragmento de código es del botón de inicio que siempre estara en cualquier menu */}

        {menu.map((element: any, nombre) => {
          return (
            <div key={nombre}>
              {console.log('element',element)}
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
                <ListItemIcon>{Icons(element.icon)}</ListItemIcon>
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
                              <ListItemIcon sx={{ pl: 4 }}>
                                {Icons(subel.icon)}
                              </ListItemIcon>
                              <ListItemText primary={subel.nombre} />
                              {openTercer ? <ExpandLess /> : <ExpandMore />}
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
                                          <ListItemIcon sx={{ pl: 8 }}>
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
            localStorage.clear();
            window.location.assign(process.env.REACT_APP_APPLICATION_LOGIN!);
          }}
          divider
        >
          <ListItemIcon>{Icons("ExitToApp")}</ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItemButton>
        {/** Este fragmento de código es del botón de Salir que siempre estara en cualquier menu */}
      </List>
    </Box>
  );
}
