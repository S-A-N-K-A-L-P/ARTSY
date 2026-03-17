'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <Box 
      sx={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        py: 8,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative backdrop elements can go here */}
      <Box sx={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, bgcolor: 'primary.main', opacity: 0.1, borderRadius: '50%', filter: 'blur(50px)' }} />
      <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, bgcolor: 'secondary.main', opacity: 0.1, borderRadius: '50%', filter: 'blur(50px)' }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Typography 
          variant="h1" 
          fontWeight={900} 
          gutterBottom 
          sx={{ 
            letterSpacing: '-0.05em', 
            fontSize: { xs: '3.5rem', sm: '5rem', md: '8rem' },
            background: 'linear-gradient(45deg, #ffffff, #888888)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ARTY
        </Typography>
        
        <Typography 
          variant="h4" 
          color="text.secondary" 
          sx={{ mb: 6, fontWeight: 300, maxWidth: 600, mx: 'auto', px: 2 }}
        >
          Curated marketplace for aesthetics.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button component={Link} href="/explore" variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 2 }}>
            Explore Creators
          </Button>
          <Button component={Link} href="/login" variant="outlined" size="large" sx={{ px: 4, py: 1.5, borderRadius: 2 }}>
            Login / Sign Up
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}