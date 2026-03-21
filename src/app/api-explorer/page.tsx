'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  Lock, 
  Person, 
  Palette, 
  Article, 
  Search, 
  Favorite, 
  Chat, 
  ShoppingCart, 
  RssFeed, 
  Settings, 
  Analytics, 
  AdminPanelSettings 
} from '@mui/icons-material';

const layers = [
  { name: 'Auth Layer', icon: <Lock />, count: 10, endpoints: ['Auth', 'Login', 'Register', 'Session', 'Token', 'RefreshToken', 'Logout', 'OTP', 'PasswordReset', 'DeviceAuth'] },
  { name: 'User Layer', icon: <Person />, count: 10, endpoints: ['Profile', 'Preferences', 'Onboarding', 'Settings', 'Privacy', 'Notifications', 'AccountStatus', 'Stats', 'Activity', 'History'] },
  { name: 'Aesthetic Layer', icon: <Palette />, count: 10, endpoints: ['Theme', 'Aesthetic', 'ColorPalette', 'Layout', 'DynamicUI', 'FeedPreference', 'Recommendation', 'Interest', 'Mood', 'ExperienceMode'] },
  { name: 'Content Layer', icon: <Article />, count: 10, endpoints: ['Feed', 'ForYou', 'Trending', 'Explore', 'Post', 'PostDetail', 'Media', 'Cache', 'Draft', 'Upload'] },
  { name: 'Search Layer', icon: <Search />, count: 8, endpoints: ['Search', 'Result', 'Filter', 'Category', 'Tag', 'Discovery', 'Suggestion', 'History'] },
  { name: 'Engagement Layer', icon: <Favorite />, count: 7, endpoints: ['Like', 'Comment', 'Share', 'Bookmark', 'Reaction', 'ViewTracking', 'Analytics'] },
  { name: 'Social Layer', icon: <Chat />, count: 5, endpoints: ['Chat', 'Message', 'Conversation', 'Notification', 'ActivityFeed'] },
  { name: 'Commerce Layer', icon: <ShoppingCart />, count: 10, endpoints: ['Product', 'Cart', 'Checkout', 'Order', 'Payment', 'Subscription', 'Wallet', 'Coupon', 'Delivery', 'Vendor'] },
  { name: 'Realtime Layer', icon: <RssFeed />, count: 5, endpoints: ['WebSocket', 'LiveFeed', 'LiveQuiz', 'Presence', 'Sync'] },
  { name: 'System Layer', icon: <Settings />, count: 5, endpoints: ['Config', 'FeatureFlag', 'Error', 'Loading', 'Network'] },
  { name: 'Analytics Layer', icon: <Analytics />, count: 4, endpoints: ['Analytics', 'EventTracking', 'Session', 'Heatmap'] },
  { name: 'Admin Layer', icon: <AdminPanelSettings />, count: 4, endpoints: ['Admin', 'Moderation', 'Report', 'ContentReview'] },
];

export default function ApiExplorer() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom 
          sx={{ fontWeight: 'bold', color: 'var(--accent)' }}>
          ARTSY API Explorer
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ORE ARCHITECTURE: 12 Layers, 88 Endpoints
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {layers.map((layer) => (
          <Grid item xs={12} md={6} lg={4} key={layer.name}>
            <Card sx={{ 
              height: '100%', 
              backgroundColor: 'var(--card-color)', 
              borderColor: 'var(--accent)',
              borderWidth: 1,
              borderStyle: 'solid',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)' }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(var(--accent-rgb), 0.1)', 
                    color: 'var(--accent)',
                    mr: 2 
                  }}>
                    {layer.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {layer.name}
                    </Typography>
                    <Chip size="small" label={`${layer.count} Endpoints`} 
                      sx={{ mt: 0.5, backgroundColor: 'rgba(var(--accent-rgb), 0.2)', color: 'var(--accent)' }} />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {layer.endpoints.map((ep) => (
                    <Chip 
                      key={ep} 
                      label={`/${ep.toLowerCase()}`} 
                      variant="outlined" 
                      size="small"
                      sx={{ fontSize: '0.75rem', borderColor: 'rgba(var(--accent-rgb), 0.3)' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 8, textAlign: 'center', p: 4, borderRadius: 4, backgroundColor: 'rgba(var(--accent-rgb), 0.05)' }}>
        <Typography variant="body2" color="text.secondary">
          Base Path: <code>/api/flutter/</code>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          All endpoints support GET and POST methods with built-in JSON validation.
        </Typography>
      </Box>
    </Container>
  );
}
