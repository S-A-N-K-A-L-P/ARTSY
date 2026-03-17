'use client';

import React from 'react';
import { Box, Typography, Container, Avatar, Paper } from '@mui/material';
import { motion } from 'framer-motion';

// Mock data
const mockPosts = [
  { id: 1, username: 'luna', avatarUrl: 'https://i.pravatar.cc/150?u=luna', text: 'Just dropped a new synthwave pack. Neon dreams await. 🌃', likes: 124 },
  { id: 2, username: 'kage', avatarUrl: 'https://i.pravatar.cc/150?u=kage', text: 'Concrete and steel. New brutalist collection live.', likes: 89 },
  { id: 3, username: 'nischix', avatarUrl: 'https://i.pravatar.cc/150?u=nischix', text: 'Black is not sad. Black is poetic. How do you style noir?', likes: 256 },
];

export default function CommunityPosts() {
  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
        Community Threads
      </Typography>
      
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {mockPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <Avatar src={post.avatarUrl} sx={{ width: 48, height: 48 }} />
                <Typography variant="subtitle1" fontWeight="bold">@{post.username}</Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
                {post.text}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  ♥ {post.likes} Likes
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
}