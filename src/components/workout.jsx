import React from 'react';
import RecipeReviewCard from './Card'; // Import the Card component
import { Grid } from '@mui/material'; // Import MUI Grid

export const Workout = () => {
  return (
    <Grid container spacing={2}>
      {/* Render 6 cards */}
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <RecipeReviewCard />
        </Grid>
      ))}
    </Grid>
  );
};
