import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        padding: 0,
        border: "none",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign your team up for TeamTrainer
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          border: "none",
          textAlign: "left",
        }}
      >
        <h3>Regular trainings</h3>
        <p>Create as many or as few training sessions as needed.</p>
        <h3>Customisable Programs</h3>
        <p>Create sport specific programs from a wide variety of exercises, or ask about our programs to order.</p>
        <h3>Flexibility</h3>
        <p>Athletes complete training in their own time, at their own gym.</p>
        <h3>Get in contact today to find out more.</h3>
        <p> email: info@teamtrainer.com.au</p>
      </Box>
    </Box>
  );
};
