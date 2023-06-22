import React, { useState } from "react";
import {
  AppBar, Box, Drawer, IconButton, Menu, MenuItem, Toolbar, Typography, Grid,
  Tooltip, Badge
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Email, Notifications } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import SideMenu from "./SideMenu";
import { grey } from "@mui/material/colors";
import { NavStyle } from "./NavStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../assets/svg/logo.svg";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerNotificationOpen, setIsDrawerNotificationOpen] = useState(false);
  const query = {
    isXs: useMediaQuery("(min-width: 0px) and (max-width: 1025px)"),
  };
  // const container = window !== undefined ? () => window().document.body : undefined;

  // no se como cambiar esto
  if (auth)
    return (
      <Box>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Grid
              container
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item mt={0.5}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item mt={0.5}>
                <img src={logo} style={{ height: "40px" }} alt={"logo"}></img>
              </Grid>
              <Grid
                mt={1.5}
                display={"flex"}
                justifyContent={"space-between"}
                width={85}
              >
                <Grid>
                  <Badge badgeContent={0} color="info">
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
                  </Badge>
                </Grid>
                <Grid>
                </Grid>
              </Grid>
            </Grid>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Grid
                container
                sx={{ width: query.isXs ? "50vw" : "30vw", height: "inherit" }}
              >
                <Grid item container direction="column" mt={2}>
                  <SideMenu />
                </Grid>
              </Grid>
            </Drawer>
          </Toolbar>
        </AppBar>
        <Grid
          container
          sx={{ width: "100%", height: "inherit", paddingX: 2, paddingY: 4 }}
        >
            {props.children}
        </Grid>
      </Box>
    );
  else
    return <div>{props.children}</div>;
}

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
