import React from "react";
import { useState } from "react";
import {AppBar,Box,Drawer,IconButton,Menu,MenuItem,Toolbar,Typography,} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Email, Notifications } from "@mui/icons-material";
import SideMenu from "./SideMenu";
import { grey} from "@mui/material/colors";

// ancho del drawer
const drawerWidth = 300;
const ColorGris = grey[600];

// const endpoint = 'http://127.0.0.1:8000/api/'
function NavBar(props: { children?: any; window?: any }) {
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

  const [anchorNotificaciones, setAnchorNotificaciones] = useState<null | HTMLElement>(null);
  const handleMenuNotificaciones = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNotificaciones(event.currentTarget);
  };
  const handleCloseNotificaciones = () => {
    setAnchorNotificaciones(null);
  };

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // const container = window !== undefined ? () => window().document.body : undefined;
    
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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <i className="fa-solid fa-bars" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Plataforma de Administración de Bienes Muebles e Inmuebles
            </Typography>
            {/* menu de mensajes */}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuNotificaciones}
                color="inherit"
              >
                <Email />
              </IconButton>
              {/* {userName} */}
              <Menu
								id="appbar-notificaciones"
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorNotificaciones)}
								onClose={handleCloseNotificaciones}
							>
								<MenuItem onClick={handleCloseNotificaciones}>Profile</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
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
                <Notifications />
              </IconButton>
              {/* {userName} */}
              <Menu
								id="appbar-alerta"
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorAlerta)}
								onClose={handleCloseAlerta}
							>
								<MenuItem onClick={handleCloseAlerta}>Profile</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
            </div>
          </Toolbar>
        </AppBar>

        {/* no se donde esta este box */}
        {/* <Box>
         <SideMenu />
        </Box> */}
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
        <Box component="main" sx={{ flexGrow: 1,p: 5, width:'76vw',top:'7vh', position:'absolute',left:'18vw', }}>
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
