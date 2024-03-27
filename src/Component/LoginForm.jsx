import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@material-ui/core';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = () => {
    // Add your authentication logic here (e.g., API calls, validation).
    // You can use 'username' and 'password' state variables.
    console.log('Logging in:', username, password);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (username.trim() === '') {
      newErrors.username = 'Email address is required';
      valid = false;
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <Grid align="center">
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={10} style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Log In</h2>
 
          <TextField
            label="Email Address"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            error={!!errors.username}
            helperText={errors.username}
          />
          <br />
          <br />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={!validateForm()}
          >
            Log In
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
