"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { Grid as Grid2 } from "@mui/material";
import AestheticRenderer from "../aesthetics/AestheticRenderer";
import { Button } from "../ui/Button";

export default function AestheticShowcase() {
  return (
    <Container>
      <Typography variant="h4" mb={4}>
        Explore Aesthetics
      </Typography>

      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <AestheticRenderer aesthetic="noir">
             <Box sx={{ p: 4, bgcolor: 'background.paper', color: 'text.primary', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>Noir</Box>
          </AestheticRenderer>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <AestheticRenderer aesthetic="vaporwave">
             <Box sx={{ p: 4, bgcolor: 'background.paper', color: 'text.primary', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>Vaporwave</Box>
          </AestheticRenderer>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <AestheticRenderer aesthetic="brutalist">
             <Box sx={{ p: 4, bgcolor: 'background.paper', color: 'text.primary', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>Brutalist</Box>
          </AestheticRenderer>
        </Grid2>
      </Grid2>
    </Container>
  );
}