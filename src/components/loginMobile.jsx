import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "../App.css";

export const LoginMobile = () => {
  const [emailId, setEmailId] = useState(""); // Use emailId
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

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
        navigate("/calendar"); // Redirect to the desired route
      } else {
        console.error("Login failed", data.error);
        setError(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    navigate("/createAccount");
  };

  return (
    <div className="loginMobile">
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
          border: "0px solid #ccc",
          borderRadius: 2,
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgb(235, 228, 219)",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color={"rgb(255, 51, 0)"}
          gutterBottom
        >
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
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "rgb(255, 51, 0)",
            color: "#fff",
            "&:hover": { backgroundColor: "#FF7350" },
          }}
          fullWidth
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(255, 51, 0)",
            color: "#fff",
            "&:hover": { backgroundColor: "#FF7350" },
          }}
          fullWidth
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Box>
    </div>
  );
};
