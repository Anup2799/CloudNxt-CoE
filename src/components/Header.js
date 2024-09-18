import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 260; // Adjust sidebar width as necessary

const Header = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'black', // Header background color updated to #3956A5
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function CustomAppBar({ open, handleDrawerOpen }) {
  return (
    <Header position="fixed" open={open}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
        
        {/* Left: Menu Icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon sx={{ color: 'white' }} /> {/* Menu icon color set to white */}
        </IconButton>

        {/* Center: Title */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            color: 'white', // Title color set to white
            textAlign: 'center',
            fontFamily: 'Poppins',
            flexGrow: 1, // Allows title to center between icon and image
          }}
        >
          Zensar | CloudNxt CoE
        </Typography>

        {/* Right: Image */}
        <Box>
          <img
            src="/images/Zensar-logo.png" // Updated path for your image
            alt="Zensar Logo"
            style={{
              height: '60px', // Adjust the height of the image to fit within the header (toolbar height is 64px)
              width: 'auto',  // Automatically adjust width to maintain aspect ratio
            }}
          />
        </Box>
      </Toolbar>
    </Header>
  );
}
