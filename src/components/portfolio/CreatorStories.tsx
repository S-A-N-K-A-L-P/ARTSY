'use client';

import React from 'react';
import { Box, Typography, Container, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

// Mock data
const mockStories = [
  { username: 'nischix', avatarUrl: 'https://i.pravatar.cc/150?u=nischix', state: 'active' },
  { username: 'luna', avatarUrl: 'https://i.pravatar.cc/150?u=luna', state: 'active' },
  { username: 'mori', avatarUrl: 'https://i.pravatar.cc/150?u=mori', state: 'active' },
  { username: 'kage', avatarUrl: 'https://i.pravatar.cc/150?u=kage', state: 'seen' },
  { username: 'zero', avatarUrl: 'https://i.pravatar.cc/150?u=zero', state: 'seen' },
  { username: 'rose', avatarUrl: 'https://i.pravatar.cc/150?u=rose', state: 'seen' },
];

export default function CreatorStories() {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 4, 
            overflowX: 'auto', 
            pb: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          {mockStories.map((story, i) => (
            <motion.div key={story.username} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: 80, cursor: 'pointer' }}>
                <Box 
                  sx={{ 
                    borderRadius: '50%', 
                    p: '3px', 
                    background: story.state === 'active' ? 'linear-gradient(45deg, #7C3AED, #3B82F6)' : 'transparent',
                    border: story.state === 'seen' ? '2px solid #555' : 'none'
                  }}
                >
                  <Avatar 
                    src={story.avatarUrl} 
                    sx={{ width: 70, height: 70, border: '3px solid', borderColor: 'background.paper' }} 
                  />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 500, color: story.state === 'active' ? 'text.primary' : 'text.secondary' }}>
                  {story.username}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}