'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <Box 
      sx={{ 
        py: { xs: 12, md: 20 }, 
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(124, 58, 237, 0.1) 100%)',
      }}
    >
      <Container maxWidth="md">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Start your storefront
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 6, fontWeight: 300 }}>
            Join the fastest growing aesthetic community. Build your space, your way.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button component={Link} href="/join-us" variant="contained" size="large" sx={{ px: 5, py: 2, borderRadius: 2, fontSize: '1.2rem' }}>
              Join Now
            </Button>
            <Button component={Link} href="/explore" variant="outlined" size="large" sx={{ px: 5, py: 2, borderRadius: 2, fontSize: '1.2rem' }}>
              Explore Platform
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}