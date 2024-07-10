'use client';
import * as React from 'react';
import { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  React.useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      window.location.href = '/';
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setPasswordError('Please fill in all fields.');
      return;
    } else if (!(passwordError || emailError)) {
      try {
        const response = await fetch('http://35.208.215.114:8005/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: username, password }),
        });

        const data = await response.json();
        console.log(data);

        if (data.userId) {
          sessionStorage.setItem('authToken', data.token);
          window.location.href = '/';
        } else {
          setPasswordError(data.message);
        }
      } catch (error) {
        console.error('Login failed:', error);
        setPasswordError('An error occurred during login.');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ bgcolor: '#fff', borderRadius: 2, padding: 4, boxShadow: 3 }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => {
              const email = e.target.value;
              setUsername(email);

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                setEmailError('Please enter a valid email address.');
              } else {
                setEmailError('');
              }
            }}
          />
          {emailError && (
            <Typography variant="body2" color="error" align="left">
              {emailError}
            </Typography>
          )}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => {
              const password = e.target.value;
              setPassword(password);

              if (password.length < 6) {
                setPasswordError(
                  'Password must be at least 6 characters long.'
                );
              } else {
                setPasswordError('');
              }
            }}
          />
          {passwordError && (
            <Typography variant="body2" color="error" align="left">
              {passwordError}
            </Typography>
          )}
          <Box mt={2} textAlign="center">
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}
