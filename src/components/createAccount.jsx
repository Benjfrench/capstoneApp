import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

export const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [squadCode, setSquadCode] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();

    // Basic validation
    if (email === '' || password === '' || confirmPassword === '' || squadCode === '') {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(''); // Clear error on successful validation

    // Placeholder for actual account creation logic
    console.log('Creating account with:', { email, password, squadCode });
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
        {/* Email Address Field */}
        <TextField
          label="Email Address"
          type="email"
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
          value={squadCode}
          onChange={(e) => setSquadCode(e.target.value)}
        />

        {/* Display error message */}
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Account
        </Button>
      </Box>
    </Box>
  );
};
