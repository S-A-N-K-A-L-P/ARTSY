'use client';

import React from 'react';
import { Box, Typography, Container, } from '@mui/material'
import { Grid as Grid2 } from "@mui/material";
import { UserCard } from '../users/UserCard';
import { motion } from 'framer-motion';

// Temporary mock data; usually fetches from useUser()/userService
const mockCreators = [
  { username: 'nischix', bio: 'dark aesthetics & poetry', avatarUrl: 'https://i.pravatar.cc/150?u=nischix' },
  { username: 'luna', bio: 'synthwave vibes', avatarUrl: 'https://i.pravatar.cc/150?u=luna' },
  { username: 'mori', bio: 'less is more', avatarUrl: 'https://i.pravatar.cc/150?u=mori' },
  { username: 'kage', bio: 'brutalist architect', avatarUrl: 'https://i.pravatar.cc/150?u=kage' },
  { username: 'zero', bio: 'cyberpunk street tech', avatarUrl: 'https://i.pravatar.cc/150?u=zero' },
  { username: 'rose', bio: 'vintage grunge decay', avatarUrl: 'https://i.pravatar.cc/150?u=rose' },
];

export default function FeaturedCreators() {
  return (
    <Container sx={{ py: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
        <Typography variant="h3" fontWeight="bold">Featured Creators</Typography>
        <Typography variant="button" color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Explore all →
        </Typography>
      </Box>

      <Grid2 container spacing={4}>
        {mockCreators.map((creator, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={creator.username}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <UserCard 
                username={creator.username} 
                bio={creator.bio} 
                avatarUrl={creator.avatarUrl} 
              />
            </motion.div>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}