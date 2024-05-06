import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";

const defaultTheme = createTheme();

const UpdateUser = () => {
  
  const [formData, setFormData] = useState({
    
  });
  const [empId,setEmpId]=useState("");
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user-edit"));
    setFormData({...user});
    setEmpId(user.empId);
  },[])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:9090/api/v1/user/${empId}`,
        formData
      );
      console.log("User details updated successfully:", response.data);
      // Reset form after successful submission
      setFormData({
        ...formData,
        mobileNumber: "",
      });
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <ManageAccountsRoundedIcon />
          </Avatar>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, margin: 3 }}
          >
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
                  disabled
                  value={formData.empId}
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
                  disabled
                  value={formData.employeeName}
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
                  disabled
                  value={formData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  name="mobileNumber"
                  autoFocus
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "20px", height: "48px" }}
            >
              Update User Details
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateUser;
