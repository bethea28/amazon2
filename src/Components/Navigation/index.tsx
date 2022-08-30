import * as React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Divider,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  Button  
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import DiscoverNavBar from '../Discover/DiscoverNavBar'
import UserContext from '../../context/user/UserContext'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function NavigationBar(props: Props) {

  const {sessionId, logoutUser, isLoggedIn } = React.useContext(UserContext)
  const navigate = useNavigate()

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant='h5' sx={{ my: 2 }}>
        JumpStarter
      </Typography>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

    const logoutSessionUser = async () => {
      await logoutUser()
      .then(() => {
        navigate("/")
      })
    }

  let sessionLinks;
  if (isLoggedIn) {
    sessionLinks = (
      <>
        <NavLink to='/createProject' className="navbar">
          Create Project
        </NavLink>
        <NavLink to={`/users/${sessionId}/projects`} className="navbar">
          My Projects
        </NavLink>
        <NavLink to={`/profile/${sessionId}`} className="navbar">
          Profile
        </NavLink>
        <Button variant="contained" onClick={logoutSessionUser} sx={{boxShadow: 'none'}} title='Logout'>
          Logout
        </Button>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <NavLink to='/signin' className="navbar">
          Sign In
        </NavLink>
        <NavLink to='/signup' className="navbar">
          Register
        </NavLink>
      </>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component='nav' position='absolute'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h5'
            component='div'
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              display: { xs: "none", sm: "block" },
            }}
          >
            <NavLink to='/' style={{ color: "#fff", textDecoration: "none" }}>
              JumpStarter
            </NavLink>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              variant='body1'
              component='div'
              display='inline'
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <NavLink to='/categories/Art' className="navbar">
                Discover
              </NavLink>
              {sessionLinks}
              
            </Typography>
          </Box>
        </Toolbar>
        <Divider color='white' />
      <DiscoverNavBar />
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
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
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ p: 4 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
