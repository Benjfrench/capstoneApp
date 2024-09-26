import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { LoginModal } from "./loginModal";
import { useAuth } from "../context/AuthContext";
import "../App.css";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
    handleMenuClose();
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className="navCss">
      <AppBar position="static" className="appbar">
        <Toolbar className="toolbar">
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0,
              marginLeft: "1rem",
              color: "white",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "150%",
            }}
          >
            TeamTrainer
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                color: "white",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "150%",
              }}
            >
              Home
            </Button>
            {user ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/calendar"
                  sx={{
                    color: "white",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "150%",
                  }}
                >
                  WorkoutHub
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    color: "white",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "150%",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <LoginModal />
            )}
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" }, ml: "auto" }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem
              component={Link}
              to="/"
              onClick={handleMenuClose}
              sx={{ color: "rgb(255, 51, 0)" }}
            >
              Home
            </MenuItem>
            {user ? (
              <>
                <MenuItem
                  component={Link}
                  to="/calendar"
                  onClick={handleMenuClose}
                  sx={{ color: "rgb(255, 51, 0)" }}
                >
                  Workout Hub
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{ color: "rgb(255, 51, 0)" }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                component={Link}
                to="/loginPage"
                onClick={handleMenuClose}
                sx={{ color: "rgb(255, 51, 0)" }}
              >
                Login
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};
