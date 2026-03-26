'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, useTheme, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  bg: '#0e0e10',
  surface: '#18181c',
  border: '#2a2a32',
  accent: '#c8a96e',
  accent2: '#e8d5b0',
  text: '#f0ece4',
  muted: '#888',
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    mb: 3,
    mt: 1
  }}>
    <Typography sx={{ 
      fontSize: '10px', 
      letterSpacing: '2.5px', 
      textTransform: 'uppercase', 
      color: COLORS.accent,
      fontWeight: 'bold'
    }}>
      {children}
    </Typography>
    <Box sx={{ flex: 1, height: '1px', bgcolor: COLORS.border }} />
  </Box>
);

const StyledInput = ({ label, required, ...props }: any) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ 
        fontSize: '13px', 
        fontWeight: 500, 
        color: COLORS.accent2, 
        mb: 1,
        letterSpacing: '0.3px'
      }}>
        {label} {required && <span style={{ color: COLORS.accent }}>*</span>}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        required={required}
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#111114',
            borderRadius: '10px',
            color: COLORS.text,
            fontSize: '14px',
            '& fieldset': { borderColor: COLORS.border },
            '&:hover fieldset': { borderColor: COLORS.accent },
            '&.Mui-focused fieldset': { borderColor: COLORS.accent, borderWidth: '1px', boxShadow: `0 0 0 3px rgba(200,169,110,0.12)` },
          },
          '& .MuiInputBase-input::placeholder': { color: '#444', opacity: 1 },
        }}
      />
    </Box>
  );
};

export default function BusinessForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    organization: '',
    address: '',
    currentRole: '',
    businessHandling: '',
    productsSell: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    setFormData(prev => ({ ...prev, currentRole: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: COLORS.bg, 
      color: COLORS.text,
      py: 10,
      px: 2,
      backgroundImage: `radial-gradient(ellipse at 20% 20%, #1e1a12 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #12101a 0%, transparent 60%)`
    }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ 
            display: 'inline-block',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: COLORS.accent,
            border: `1px solid ${COLORS.accent}`,
            px: 2,
            py: 0.5,
            borderRadius: '20px',
            mb: 2.5
          }}>
            Business Profile
          </Box>
          <Typography variant="h3" sx={{ 
            fontFamily: "'Playfair Display', serif", 
            fontWeight: 700,
            mb: 1.5
          }}>
            Tell Us About Your <span style={{ color: COLORS.accent }}>Business</span>
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.muted, fontWeight: 300 }}>
            Fill in the details below to help us understand your business better.
          </Typography>
        </Box>

        <Box sx={{ 
          bgcolor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '16px',
          p: { xs: 3, md: 5 },
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
              >
                {error && (
                  <Box sx={{ bgcolor: 'rgba(255,0,0,0.1)', color: '#ff6b6b', p: 2, borderRadius: 2, mb: 3, fontSize: '14px', border: '1px solid rgba(255,0,0,0.2)' }}>
                    {error}
                  </Box>
                )}

                <SectionLabel>Personal Information</SectionLabel>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <StyledInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma" required />
                  <StyledInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +91 98765 43210" required />
                </Box>

                <StyledInput label="Affiliated Organization / Company" name="organization" value={formData.organization} onChange={handleChange} placeholder="Company or institution name" required />
                <StyledInput label="Business Address" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City, State, PIN Code" multiline rows={3} required />

                <Divider sx={{ my: 4, borderColor: COLORS.border }} />

                <SectionLabel>Business Details</SectionLabel>

                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.accent2, mb: 1 }}>
                    What Are You Currently Doing? <span style={{ color: COLORS.accent }}>*</span>
                  </Typography>
                  <Select
                    fullWidth
                    displayEmpty
                    value={formData.currentRole}
                    onChange={handleSelectChange}
                    required
                    sx={{
                      bgcolor: '#111114',
                      borderRadius: '10px',
                      color: COLORS.text,
                      fontSize: '14px',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.border },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.accent },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.accent, borderWidth: '1px' },
                      '& .MuiSelect-icon': { color: COLORS.muted }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: '#1a1a1e',
                          color: COLORS.text,
                          border: `1px solid ${COLORS.border}`,
                          '& .MuiMenuItem-root:hover': { bgcolor: '#25252b' }
                        }
                      }
                    }}
                  >
                    <MenuItem value="" disabled>Select your current role</MenuItem>
                    <MenuItem value="Business Owner">Business Owner</MenuItem>
                    <MenuItem value="Freelancer">Freelancer / Consultant</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="Student">Student / Intern</MenuItem>
                    <MenuItem value="Founder">Startup Founder</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </Box>

                <StyledInput label="Business Currently Handling" name="businessHandling" value={formData.businessHandling} onChange={handleChange} placeholder="e.g. Retail, Wholesale, E-commerce, Manufacturing..." required />
                <StyledInput label="Products They Sell" name="productsSell" value={formData.productsSell} onChange={handleChange} placeholder="List the main products or services offered..." multiline rows={3} required />

                <Divider sx={{ my: 4, borderColor: COLORS.border }} />

                <SectionLabel>Price Range</SectionLabel>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' }, gap: 2, alignItems: 'center' }}>
                  <StyledInput label="Minimum Price (₹)" name="minPrice" type="number" value={formData.minPrice} onChange={handleChange} placeholder="e.g. 500" inputProps={{ min: 0 }} />
                  <Box sx={{ textAlign: 'center', color: COLORS.muted, mb: 3, display: { xs: 'none', sm: 'block' } }}>
                    —
                  </Box>
                  <StyledInput label="Maximum Price (₹)" name="maxPrice" type="number" value={formData.maxPrice} onChange={handleChange} placeholder="e.g. 50,000" inputProps={{ min: 0 }} />
                </Box>

                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    mt: 4,
                    py: 1.8,
                    bgcolor: COLORS.accent,
                    color: '#111',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(200,169,110,0.25)',
                    '&:hover': {
                      bgcolor: COLORS.accent2,
                      boxShadow: '0 6px 28px rgba(200,169,110,0.35)',
                    },
                    textTransform: 'uppercase',
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(200,169,110,0.3)',
                      color: 'rgba(0,0,0,0.3)'
                    }
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Information →'}
                </Button>
              </motion.form>
            ) : (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Box sx={{ 
                    fontSize: '48px', 
                    mb: 2, 
                    color: COLORS.accent,
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    ✦
                  </Box>
                  <Typography variant="h4" sx={{ 
                    fontFamily: "'Playfair Display', serif", 
                    color: COLORS.accent,
                    mb: 1
                  }}>
                    Submitted Successfully
                  </Typography>
                  <Typography sx={{ color: COLORS.muted, fontSize: '14px' }}>
                    Thank you! Your business information has been recorded in our database.
                  </Typography>
                  <Button 
                    onClick={() => setSubmitted(false)}
                    sx={{ mt: 3, color: COLORS.accent, textTransform: 'none' }}
                  >
                    Submit another response
                  </Button>
                </motion.div>
              </Box>
            )}
          </AnimatePresence>
        </Box>

        <Typography sx={{ 
          textAlign: 'center', 
          mt: 3, 
          fontSize: '12px', 
          color: '#555' 
        }}>
          All information is kept confidential and used solely for business purposes.
        </Typography>
      </Container>
    </Box>
  );
}
