import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import { styled, keyframes } from '@mui/material/styles'; // Import keyframes for animation
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Drawer, Divider } from '@mui/material'; // Import Divider
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCloud, faHammer, faRocket, faBook, faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const drawerWidth = 260; // Default sidebar width

// Define the keyframes for hover animation
const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
    background-color: #3956A5;
  }
  100% {
    transform: scale(1.05);
    background-color: #001652;
  }
`;

const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: open ? drawerWidth : theme.spacing(7),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: 'auto', // Enable scrollbar when needed
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : theme.spacing(7),
    backgroundColor: '#3956A5', // Sidebar background color
    overflow: 'auto', // Enable scrollbar when needed
  },
}));

const textStyle = {
  fontFamily: 'Poppins',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '21px',
  textAlign: 'left',
  color: 'white',
};

// Updated hover style with animation
const hoverStyle = {
  '&:hover': {
    animation: `${hoverAnimation} 0.3s forwards`, // Apply hover animation on hover
  },
};

const activeTextStyle = {
  color: '#ffb6c1', // Active text color
};

const activeIconStyle = {
  color: '#ffb6c1', // Active icon color
};

export default function DrawerComponent({ open, handleDrawerClose, openSubMenu, handleClick }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route path

  const handleSubMenuClick = (item, path) => {
    navigate(path);
  };

  const handleMenuItemClick = (key, path) => {
    // Toggle submenu if it has items
    if (['Delivery Kits', 'Accelerators'].includes(key)) {
      handleClick(key);
    } else {
      navigate(path);
    }
  };

  // Check if the current path matches a sub-menu item's path
  const isSubMenuActive = (items) => items && items.some(({ path }) => location.pathname === path);

  const isActive = (path) => location.pathname === path; // Check if route matches

  return (
    <CustomDrawer variant="permanent" open={open}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: 1 }}>
        <IconButton onClick={handleDrawerClose}>
          {open ? <ChevronLeftIcon sx={{ color: 'white' }} /> : <ChevronRightIcon sx={{ color: 'white' }} />}
        </IconButton>
      </Box>
      <List>
        {[ 
          { key: 'Home', icon: faHouse, text: 'Home', path: '/' },
          { key: 'Cloud Offerings', icon: faCloud, text: 'Cloud Offerings', path: '/Offer' },
          {
            key: 'Delivery Kits',
            icon: faHammer,
            text: 'Delivery Kits',
            items: [
              { text: 'Checklists/ Templates', path: '/checklists-templates' },
              { text: 'Estimation Models', path: '/estimation-models' },
            ],
          },
          {
            key: 'Accelerators',
            icon: faRocket,
            text: 'Accelerators',
            items: [
              { text: 'ZenCompass', path: '/zencompass' },
              { text: 'ZenWaF', path: '/zenwaf' },
              { text: 'Mainframe Lens', path: '/mainframe-lens' },
              { text: 'Zen Vanguard', path: '/zen-vanguard' },
              { text: 'Zen Cloudbase', path: '/zen-cloudbase' },
              { text: 'Zen Cloud Catalogue', path: '/Cloud-catelog' },
              { text: 'Zen Mod', path: '/zen-mod' },
              { text: 'Cloud FinOps', path: '/cloud-finops' },
            ],
          },
          { key: 'Case Studies', icon: faBook, text: 'Case Studies', path: '/case-studies' },
          { key: 'Reference Architectures', icon: faBook, text: 'Reference Architectures', path: '/reference-architectures' },
          { key: 'White Papers/ PoVs', icon: faFileAlt, text: 'White Papers / PoVs', path: '/white-papers' },
        ].map(({ key, icon, text, path, items }) => (
          <React.Fragment key={key}>
            <ListItem
              button
              onClick={() => handleMenuItemClick(key, path)}
              disablePadding
              sx={{ 
                ...hoverStyle, 
                ...(isActive(path) || isSubMenuActive(items) ? { backgroundColor: '#001652' } : {}) // Highlight active item and its parent
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  ...(open ? { justifyContent: 'initial' } : { justifyContent: 'center' }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    ...(open ? { mr: 3 } : { mr: 'auto' }),
                    ...(isActive(path) || isSubMenuActive(items) ? activeIconStyle : { color: 'white' }), // Apply active color
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                </ListItemIcon>
                <ListItemText 
                  primary={text} 
                  sx={{ 
                    ...textStyle, 
                    ...(open ? { opacity: 1 } : { opacity: 0 }),
                    ...(isActive(path) || isSubMenuActive(items) ? activeTextStyle : {}), // Apply active color
                  }} 
                />
                {items && open && (openSubMenu[key] ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />)}
              </ListItemButton>
            </ListItem>
            {items && openSubMenu[key] && (
              <List component="div" disablePadding>
                {items.map(({ text, path }) => (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{ 
                      pl: 4, 
                      ...hoverStyle, 
                      ...(isActive(path) ? { backgroundColor: '#001652' } : {}) // Highlight active sub-menu item
                    }}
                  >
                    <ListItemButton onClick={() => handleSubMenuClick(text, path)}>
                      <ListItemText primary={text} sx={{ ...textStyle }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}

        {/* Divider to separate menu from the email section */}
        <Divider sx={{ backgroundColor: 'white', marginY: 2 }} />

        {/* Email section with clickable mailto link */}
        <ListItem disablePadding sx={{ ...hoverStyle }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              px: 2.5,
              ...(open ? { justifyContent: 'initial' } : { justifyContent: 'center' }),
            }}
            component="a"
            href="mailto:cloudcoe@zensar.com" // Make the email clickable
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                ...(open ? { mr: 3 } : { mr: 'auto' }),
                color: 'white',
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </ListItemIcon>
            <ListItemText primary="cloudcoe@zensar.com" sx={{ ...textStyle, ...(open ? { opacity: 1 } : { opacity: 0 }) }} />
          </ListItemButton>
        </ListItem>
      </List>
    </CustomDrawer>
  );
}
