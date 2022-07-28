import * as React from "react";
import {
  AppBar,
  Box,
  Divider,
  Toolbar,
  Typography,
  Link,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button  
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import SignIn from "../Auth/signIn";
import DiscoverNavBar from '../Discover/DiscoverNavBar'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function NavigationBar(props: Props) {

  // To update to sessionUser when user is logged in
  let sessionUser;
  let userId;

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
  
  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
      <>
        <Link href='/createProject' style={{ color: "#fff"}} underline="hover">
          Create a New Project
        </Link>
        <Link href={`/profile/${userId}`} style={{ color: "#fff"}} underline="hover">
          Profile
        </Link>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <Link href='/signin'style={{ color: "#fff"}} underline="hover">
          Log In
        </Link>
        <Link href='/signup' style={{ color: "#fff"}} underline="hover">
          Register
        </Link>
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
            <Link href='/' style={{ color: "#fff", textDecoration: "none" }}>
              JumpStarter
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              variant='body1'
              component='div'
              display='inline'
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link
                href='/categories/Art'
                style={{ color: "#fff"}} underline="hover"
              >
                Discover
              </Link>
              {sessionLinks}
              
            </Typography>
          </Box>
        </Toolbar>
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
