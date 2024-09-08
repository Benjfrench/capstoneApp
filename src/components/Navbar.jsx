import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Logo or Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TeamTrainer
        </Typography>

        {/* Right side: Links for larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
          <Button color="inherit" component={Link} to="/workout">Workout</Button>
          <Button color="inherit" component={Link} to="/createWorkout">Create Workout</Button>
        </Box>

        {/* Right side: Hamburger menu for small screens */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem component={Link} to="/home" onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About</MenuItem>
          <MenuItem component={Link} to="/services" onClick={handleMenuClose}>Services</MenuItem>
          <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>Contact</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

