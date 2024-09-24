import { useState } from "react";
import { Button, Dialog, DialogContent, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Import your auth context

export const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [emailId, setEmailId] = useState(""); // Use emailId
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (emailId === "" || password === "") {
      setError("Please enter both email and password.");
      return;
    }

    setError(""); // Clear error on successful validation

    try {
      const response = await fetch("http://localhost:8081/api/players/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId, password }), // Use emailId
      });

      const data = await response.json();

      console.log("Response from server:", data); // Debug log

      if (data.result === 200) {
        console.log("Logged in successfully:", data.user);
        login(data.player); // Update the user state in AuthContext
        handleClose(); // Close modal on successful login
        navigate("/calendar"); // Redirect to the desired route
      } else {
        console.error("Login failed", data.error)
        setError(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  const handleCreateAccount = () => {
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
            justifyContent: 'center',
            alignItems: 'center',
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
              alignItems: "center",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Login
            </Typography>

            {/* Email ID Field */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={emailId} // Use emailId
              onChange={(e) => setEmailId(e.target.value)} // Update to use emailId
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

            {/* Buttons */}
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
