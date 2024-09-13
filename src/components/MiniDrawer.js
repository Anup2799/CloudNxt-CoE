import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import CustomAppBar from './Header'; // Make sure this path is correct
import CustomDrawer from './Sidebar'; // Ensure this is the correct component name for your drawer

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({ cloudservice: false, awsservice: false });

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleClick = (key) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        openSubMenu={openSubMenu}
        handleClick={handleClick}
      />
    </Box>
  );
}
