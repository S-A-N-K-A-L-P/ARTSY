import React from 'react';
import { Box, Typography, } from '@mui/material'
import { Grid as Grid2 } from "@mui/material";

interface Stat {
  label: string;
  value: string | number;
}

interface StorefrontStatsProps {
  stats: Stat[];
}

export const StorefrontStats: React.FC<StorefrontStatsProps> = ({ stats }) => {
  return (
    <Grid2 container spacing={4} sx={{ my: 4 }}>
      {stats.map((stat, index) => (
        <Grid2 key={index} size={{ xs: 6, sm: 3 }} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            {stat.label}
          </Typography>
        </Grid2>
      ))}
    </Grid2>
  );
};