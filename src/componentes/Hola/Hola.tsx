import * as React from "react";
import { Box } from "@mui/material";
import {menu} from "../Json/Menu";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import {Icons}  from '../../layout/Icons';

const MenuSX = {
  color: "#212121",
  "&& .Mui-selected, && .Mui-selected:hover": {
    bgcolor: "#e57373",
    "&, & .MuiListItemIcon-root": { color: "#212121" },
  },
  "& .MuiListItemButton-root:hover": {
    bgcolor: "#e57373",
    "&, & .MuiListItemIcon-root": { color: "#ffffff" },
  },
};

const  Hola = () => {

const navigate = useNavigate();
const [itemSelected, setItemSelected] = React.useState(0);

const [openSegundo, setOpenSegundo] = React.useState(0); // esta es una variable de estado
const handleOpenCollapse = (id: number) => { // esta es la funcion en donde se modifica la variable de
  setOpenSegundo(id);
};

const [openTercer, setOpenTercer] = React.useState(0);
const handleOpenCollapseTercer = (id: number) => {
  setOpenTercer(id);
};


/*
  const [openMuebles, setOpenMuebles] = React.useState(false);
  const handleClickMuebles = () => {
    setOpenMuebles(!openMuebles);
  };
};*/


/** Recorrer el menu y generar los useState dinamicos y luego el manejador de eventos */
  return (
    <Box
    sx={{ width: "90%", top: "6vh", position: "absolute" }}
  >
<List sx={MenuSX}>
        {/** Este fragmento de código es del botón de inicio que siempre estara en cualquier menu */}
        <ListItemButton
          onClick={() => {setItemSelected(0); navigate("/");}}
          divider
          selected={itemSelected === 0 ? true : false}
        >
          <ListItemIcon>
          {Icons("Home")}
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
        {/** Termina el fragmento de código es del botón de inicio que siempre estara en cualquier menu */}









      {menu.map((element:any , nombre) => {
        return (

          <div key={nombre}>

          <ListItemButton
          onClick={() => {
            setItemSelected(element.id);
            handleOpenCollapse(element.id);
          }}
          divider
          selected={itemSelected === element.id ? true : false}
        >
          <ListItemIcon>
            {Icons(element.icon)}
          </ListItemIcon>
          <ListItemText primary={element.nombre} /><ListItemText primary={element.id} /><ListItemText primary='nivel cero' />
          {/*openSegundo ? <ExpandLess /> : <ExpandMore />*/}
        </ListItemButton>

            {
              element?.submenu && (
                <Collapse in={openSegundo===element.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {element.submenu.map((subel: any, index: number) => {
                  return ( 
                    <div key={subel.nombre}>
                        <ListItemButton
                        onClick={() => {
                        setItemSelected(subel.id);
                        handleOpenCollapseTercer(subel.id);
                        }}
                        divider
                        selected={itemSelected === element.id ? true : false}
                        >
                      <ListItemIcon>
                        {Icons(subel.icon)}
                      </ListItemIcon>
                      <ListItemText primary={subel.nombre} /><ListItemText primary={subel.id} /><ListItemText primary='segundo nivell' />
                      {/*openTercer ? <ExpandLess /> : <ExpandMore />*/}
                      </ListItemButton>
                      
                    {
                      subel?.submenuTercerNivel && (
                        <Collapse in={openTercer===subel.id} timeout="auto"  >
                          <List component="div" disablePadding>
                          {subel?.submenuTercerNivel.map((tercer: any) => {
                            return ( 
                              <ListItemButton
                              onClick={() => {
                              setItemSelected(tercer.id);
                              navigate(tercer.ruta);
                              }}
                              divider
                              selected={itemSelected === tercer.id ? true : false}
                              >
                              <ListItemIcon>
                                {Icons(tercer.icon)}
                              </ListItemIcon>
                              <ListItemText primary={tercer.nombre} /><ListItemText primary={tercer.id} /><ListItemText primary='tercer  nivel' />
                              </ListItemButton>

                            )
                          }
                          )}
                          </List>
                        </Collapse>
                      )
                    }
                    </div>
                  )
                }
                )}
                </List>
                </Collapse>
              )
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
          <ListItemIcon>
          {Icons("ExitToApp")}
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItemButton>     
        {/** Este fragmento de código es del botón de Salir que siempre estara en cualquier menu */}
    </List>
      </Box>
  );

  }

  export default Hola;