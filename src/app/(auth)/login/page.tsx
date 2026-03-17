'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Divider, Alert, Container, Paper } from '@mui/material';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async () => {
        setLoading(true);
        setError('');
        const res = await signIn('credentials', { email, password, redirect: false });
        if (res?.error) {
            setError('Invalid email or password');
            setLoading(false);
        } else {
            router.push('/');
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', bgcolor: 'background.default', px: 2
        }}>
            <Paper elevation={0} sx={{ width: '100%', maxWidth: 400, p: 4, bgcolor: 'background.paper', borderRadius: 4 }}>
                <Typography variant="h4" fontWeight={800} mb={1} letterSpacing="-0.02em">
                    Welcome back
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Sign in to your Arty account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleEmailLogin}
                    disabled={loading}
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        boxShadow: 'none',
                        '&:hover': { boxShadow: 'none' }
                    }}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 3, color: 'text.secondary', fontSize: '0.875rem' }}>or continue with</Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        borderColor: 'divider',
                        color: 'text.primary',
                        '&:hover': { borderColor: 'text.primary', bgcolor: 'transparent' }
                    }}
                >
                    Google
                </Button>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        No account?{' '}
                        <Button href="/signup" sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main', p: 0, minWidth: 'auto' }}>
                            Sign up
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
