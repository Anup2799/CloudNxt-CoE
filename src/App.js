import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer'; // Ensure this import matches your component
import Home from './Pages/Home';
import Strategy from './Pages/cloud-offer/Strategy';
import Foundation from './Pages/cloud-offer/Foundation'; 
import Migrate from './Pages/cloud-offer/Migrate-Modernize';
import Operations from './Pages/cloud-offer/Operations';
import Catelog from './Pages/Acce/Cloud-catalogue';
import Offer from './Pages/cloud-offer/Offer';
import From from './Pages/From-page/From';
import Cloudbase from './Pages/Acce/Cloudbase';


function App() {
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});

  const handleDrawerClose = () => {
    setOpen(!open); // Toggle drawer open/close
  };

  const handleClick = (key) => {
    setOpenSubMenu((prevOpenSubMenu) => ({
      ...prevOpenSubMenu,
      [key]: !prevOpenSubMenu[key], // Toggle submenu
    }));
  };

  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        <MiniDrawer 
          open={open} 
          handleDrawerClose={handleDrawerClose} 
          openSubMenu={openSubMenu} 
          handleClick={handleClick} 
        />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/Foundation" element={<Foundation />} />
            <Route path="/Migrate-Modernize" element={<Migrate />} />
            <Route path="/Operations" element={<Operations />} />
            <Route path="/Cloud-catelog" element={<Catelog />} />
            <Route path="/Offer" element={<Offer />} />
            <Route path="/Cloudbase" element={<Cloudbase/>} />
            <Route path="/From" element={<From />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
