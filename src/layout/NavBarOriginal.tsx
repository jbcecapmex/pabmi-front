import { useState } from "react";
import {AppBar,Box,Drawer,IconButton,Toolbar,Typography,} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {Email,Notifications,} from "@mui/icons-material";
import SideMenu from "./SideMenu";
import { grey, red } from "@mui/material/colors";

// ancho del drawer
const drawerWidth = 300;
const ColorGris = grey[600];

// const endpoint = 'http://127.0.0.1:8000/api/'
function NavBar(props: { children?: any; window?: any }) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  // const auth = authCheck()
  const auth = true;
  var userName = "";
  // if (auth) userName = localStorage.getItem('user')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //  const data = { id: getUser().id }
    //  const result = await post(endpoint, 'logout', data)
    //  if (result) {
    //  	removeTokens();
    navigate("/login");
    // }
    setAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  // no se como cambiar esto
  if (auth)
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          // enableColorOnDark
          // ancho del appbar
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
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
                onClick={handleMenu}
                color="inherit"
              >
                <Email />
              </IconButton>
              {/* {userName} */}
              {/* <Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu> */}
            </div>
            {/* menu de notificaciones */}
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Notifications />
              </IconButton>
              {/* {userName} */}
              {/* <Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu> */}
            </div>
          </Toolbar>
        </AppBar>
        {/* no se donde esta este box */}
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            borderRadius: "10px",
            backgroundColor: "white",
          }}
          aria-label="mailbox folders"
        >
          {/* <Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						<SideMenu2 />
					</Drawer> */}

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <SideMenu />
          </Drawer>
        </Box>
        {/* fondo de pantalla del centro */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 5,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    );
  else return <div>{props.children}</div>;
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;
