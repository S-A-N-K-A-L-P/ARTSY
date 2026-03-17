'use client';

import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { Grid as Grid2 } from "@mui/material";
import { motion } from 'framer-motion';

const aesthetics = [
  { id: 'noir', color: '#1a1a1a', textColor: '#ffffff' },
  { id: 'vaporwave', color: '#ff71ce', textColor: '#1a0030' },
  { id: 'grunge', color: '#3b3530', textColor: '#dcdcdc' },
  { id: 'minimal', color: '#f5f5f5', textColor: '#111111' },
  { id: 'cyberpunk', color: '#fcee0a', textColor: '#050505' },
  { id: 'brutalist', color: '#0000ff', textColor: '#ffffff' }
];

export default function TrendingAesthetics() {
  return (
    <Container sx={{ py: 10 }}>
      {/* Horizontal discovery section header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
        <Typography variant="h3" fontWeight="bold">Trending Aesthetics</Typography>
        <Typography variant="button" color="primary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Browse all →
        </Typography>
      </Box>

      {/* Horizontal Scroll Container */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 3, 
          overflowX: 'auto', 
          pb: 4,
          px: 1,
          scrollSnapType: 'x mandatory',
          // Hide scrollbar but keep functionality
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {aesthetics.map((a, i) => (
          <Box 
            key={a.id} 
            sx={{ 
              minWidth: { xs: 200, md: 250 }, 
              scrollSnapAlign: 'start' 
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Paper 
                elevation={6}
                sx={{ 
                  height: 300, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: a.color, 
                  color: a.textColor,
                  borderRadius: 4,
                  cursor: 'pointer',
                  border: a.id === 'brutalist' ? '4px solid black' : 'none',
                  boxShadow: a.id === 'brutalist' ? '8px 8px 0px black' : undefined
                }}
              >
                <Typography 
                  variant="h5" 
                  fontWeight={a.id === 'minimal' ? 300 : 900} 
                  sx={{ 
                    textTransform: 'uppercase', 
                    letterSpacing: a.id === 'cyberpunk' ? '0.2em' : 'normal',
                    fontFamily: a.id === 'vaporwave' ? 'monospace' : 'inherit'
                  }}
                >
                  {a.id}
                </Typography>
              </Paper>
            </motion.div>
          </Box>
        ))}
      </Box>
    </Container>
  );
}