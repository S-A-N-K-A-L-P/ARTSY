import React from 'react';
import BusinessForm from '@/components/portfolio/BusinessForm';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Box } from '@mui/material';

export const metadata = {
  title: 'Join Us | Artsy Business Profile',
  description: 'Tell us about your business and join the Artsy community.',
};

export default function JoinUsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <BusinessForm />
      </Box>
      <Footer />
    </Box>
  );
}
