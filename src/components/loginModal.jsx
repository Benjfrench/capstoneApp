import { useState } from "react";
import { Button, Dialog, DialogContent, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (username === "" || password === "") {
      setError("Please enter both username and password.");
      return;
    }

    setError(""); // Clear error on successful validation

    // Placeholder for actual login logic
    console.log("Logging in with:", { username, password });

    // Close modal on successful login
    handleClose();
  };

  const handleCreateAccount = () => {
    // Close the modal and navigate to the create account page
    handleClose();
    navigate("/createAccount");
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ 
          '& .MuiDialog-paper': {
            width: "80%",
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',  // Center content horizontally
            alignItems: 'center',       // Center content vertically
          }
        }}
      >
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              width: "100%",
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 2,
              border: "2px solid #ccc",
              borderRadius: 2, 
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              alignItems: "center",  // Center the form fields
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Login
            </Typography>

            {/* Username Field */}
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Display error message */}
            {error && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}

            {/* Buttons - Positioned directly below the input fields */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
