import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';

const defaultTheme = createTheme();

export default function CreateUser() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user = {
            empId: formData.get('employeeCode'),
            emailId: formData.get('email'),
            password: '', // You need to handle password securely, not included here for simplicity
            userName: formData.get('employeeName'),
            role: formData.get('role')
        };
        try {
            const response = await axios.post('http://localhost:9090/api/v1/user', user);
            console.log('User created successfully:', response.data);
            // Clear form data after successful submission
            event.currentTarget.reset();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const [role, setRole] = React.useState('');
    const handleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 5,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <PersonRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enter User Details
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, margin:3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="off"
                                    name="employeeCode"
                                    required
                                    fullWidth
                                    id="employeeCode"
                                    label="Employee Code"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="employeeName"
                                    label="Employee Name"
                                    name="employeeName"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel id="role-label">Role</InputLabel>
                                    <Select
                                        labelId="role-label"
                                        id="role"
                                        value={role}
                                        onChange={handleChange}
                                        name="role"
                                    >
                                        <MenuItem value={"user"}>User</MenuItem>
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius: '20px', height:'48px' }}
                        >
                            Register User
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
