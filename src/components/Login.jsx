import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Mark this function as async
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (email === "" || password === "") {
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
        body: JSON.stringify({ emailId: email, password }), // Sending emailId
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log("Login successful:", data);
        // You may want to store user info in localStorage or state management
      } else {
        setError(data.error); // Show error message from server
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to the server.");
    }
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
          padding: 2,
          border: "2px solid #ccc",
          borderRadius: 2,
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white"
        }}
      >
        {/* Email Field */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
