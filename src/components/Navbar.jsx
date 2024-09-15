import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { LoginModal } from './loginModal';

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
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginLeft: '1rem' }}>
          TeamTrainer
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'flex-end' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
          <Button color="inherit" component={Link} to="/workout">Workout</Button>
          <Button color="inherit" component={Link} to="/createWorkout">Create Workout</Button>
          {/* Use the LoginModal here */}
          <LoginModal />
        </Box>

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
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem component={Link} to="/calendar" onClick={handleMenuClose}>Calendar</MenuItem>
          <MenuItem component={Link} to="/workout" onClick={handleMenuClose}>Workout</MenuItem>
          <MenuItem component={Link} to="/createWorkout" onClick={handleMenuClose}>Create Workout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
