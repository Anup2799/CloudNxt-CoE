import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Drawer, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCloud, faHammer, faRocket, faBook, faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 260; // Updated sidebar width

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
  overflow: 'auto',
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : theme.spacing(7),
    backgroundColor: '#3956A5',
    overflow: 'auto',
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

const hoverStyle = {
  '&:hover': {
    animation: `${hoverAnimation} 0.3s forwards`,
  },
};

const activeTextStyle = {
  color: '#ffb74d',
};

const activeIconStyle = {
  color: '#ffb74d',
};

export default function DrawerComponent({ open, handleDrawerClose, openSubMenu, handleClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubMenuClick = (item, path) => {
    navigate(path);
  };

  const handleMenuItemClick = (key, path) => {
    if (['Delivery Kits', 'Accelerators'].includes(key)) {
      handleClick(key);
    } else {
      navigate(path);
    }
  };

  const isSubMenuActive = (items) => items && items.some(({ path }) => location.pathname === path);
  const isActive = (path) => location.pathname === path;

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
          { key: 'Cloud Offerings', icon: faCloud, text: 'Cloud Offerings', path: '/Cloudo' },
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
              { text: 'Zen Cloudbase', path: '/Cloudbase' },
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
                ...(isActive(path) || isSubMenuActive(items) ? { backgroundColor: '#001652' } : {}),
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
                    ...(isActive(path) || isSubMenuActive(items) ? activeIconStyle : { color: 'white' }),
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    ...textStyle,
                    ...(open ? { opacity: 1 } : { opacity: 0 }),
                    ...(isActive(path) || isSubMenuActive(items) ? activeTextStyle : {}),
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
                      ...(isActive(path) ? { backgroundColor: '#001652' } : {}),
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

        <Divider sx={{ backgroundColor: 'white', marginY: 2 }} />

        <ListItem disablePadding sx={{ ...hoverStyle }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              px: 2.5,
              ...(open ? { justifyContent: 'initial' } : { justifyContent: 'center' }),
            }}
            component="a"
            href="mailto:cloudcoe@zensar.com"
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
