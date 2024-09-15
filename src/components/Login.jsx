import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

    // You can perform login logic here, such as sending a request to your API.
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        padding: 0,
        border: "none"
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%",
          maxWidth: 360,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2, // Padding inside the form container
          border: "2px solid #ccc",
          borderRadius: 2, // Rounded corners for the border
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)", // Optional shadow
          backgroundColor: "white"
        }}
      >
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

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Button
          component={Link}
          to="/createAccount"
          variant="contained"
          color="primary"
          fullWidth
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};
