import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

export const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [squadId, setSquadId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!firstName || !lastName || !emailId || !password || !confirmPassword || !squadId) {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    
    const formData = {
      firstName,
      lastName,
      emailId,
      password,
      squadId,
    };

    try {
      const response = await fetch('http://localhost:8081/api/players/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully!');
      } else {
        setError(result.error || 'Error creating account.');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Create Account
      </Typography>

      <Box
        component="form"
        onSubmit={handleCreateAccount}
        sx={{
          width: '100%',
          maxWidth: 360,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* First Name Field */}
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        {/* Last Name Field */}
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        {/* Email Address Field */}
        <TextField
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
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

        {/* Confirm Password Field */}
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Squad Code Field */}
        <TextField
          label="Squad Code"
          variant="outlined"
          fullWidth
          value={squadId}
          onChange={(e) => setSquadId(e.target.value)}
        />

        {/* Display error message */}
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="primary" sx={{ marginBottom: 2 }}>
            {success}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Account
        </Button>
      </Box>
    </Box>
  );
};
