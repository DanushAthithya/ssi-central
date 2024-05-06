import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import img from './img.jpg';
import logo from '../../Images/GenySys__2_-removebg-preview.png';
import backgroundImage from '../../Images/img.jpg';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Login() {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit =async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9091/api/v1/login', { emailId, password });
      console.log('Login successful:', response.data);
      localStorage.setItem("token",response.data);
      if(response.status===200)
      {
        const response2=await axios.post('http://localhost:9091/api/v1/getuser',{emailId,password});
        if(response2.status===200)
        {
          localStorage.setItem("user",JSON.stringify({...response2.data}));
          if(response2.data.role==="Admin")
          {
            window.location.replace("/adminHome");
          }
          else{
            window.location.replace("/userHome");
          }
        }
      }
      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={15} square>
          <Box
            sx={{
              my: 16,
              mx: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      flexGrow: 1,
                      padding: "0",
                      margin:"0",
                      fontWeight: "bold",
                    }}
                  >
                    <img  src={logo} style={{width:"100%",margin:"0"}} alt="logo of genysys" />
                  </Box>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgotPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;