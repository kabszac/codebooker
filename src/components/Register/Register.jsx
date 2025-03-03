import React, { useState } from 'react';
import {
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Button,
    Typography,
    Container,
    IconButton,
    Grid,
    Box,
    Avatar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(
            (prevShowConfirmPassword) => !prevShowConfirmPassword
        );
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3001/api/user/register',
                {
                    username,
                    email,
                    password,
                }
            );
            if (response.status === 200) {
                // Registration successful, redirect to login page or desired location
                window.location.href = '/login';
            }
        } catch (error) {
            console.error(error);
            // Handle registration error, display error message to the user
        }
    };

    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign up
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleRegister}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label='username'
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id='lastName'
                                    label='email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={
                                                    handleTogglePasswordVisibility
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Confirm Password'
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={
                                                    handleToggleConfirmPasswordVisibility
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value='allowExtraEmails'
                                            color='primary'
                                        />
                                    }
                                    label='I agree to the Terms and Conditions'
                                />
                                <Typography variant='body2'>
                                    Read our{' '}
                                    <Link
                                        href='/privacy-policy'
                                        target='_blank'
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link href='/login' variant='body2'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
