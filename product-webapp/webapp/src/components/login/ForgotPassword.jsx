import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card, CardContent } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import bg from "../../Images/bg.svg";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (step) {
        case 1:
          // Check if email exists in the database
          const emailResponse = await axios.post(
            `http://localhost:9091/api/v1/forgetPassword/${email}`
          );
          if (emailResponse.status === 200) {
            // Send OTP
            console.log("OTP sent to email:", email);
            setUpdateMessage("");
            setStep(2);
          } else {
            console.log("Email does not exist:", email);
            setUpdateMessage("Email does not exist");
            // Handle case where email doesn't exist
          }
          break;
        case 2:
          // Verify OTP
          const otpVerificationResponse = await axios.post(
            `http://localhost:9091/api/v1/otpVerify/${otp}`,
            email, // Send email as a string directly
            {
              headers: {
                "Content-Type": "text/plain", // Set the content type to text/plain
              },
            }
          );

          console.log(
            "OTP verification response:",
            otpVerificationResponse.data
          );
          setVerificationMessage(otpVerificationResponse.data.message);
          if (otpVerificationResponse.status === 200) {
            setUpdateMessage("");
            setStep(3);
          } else {
            console.log("Wrong otp");
            setUpdateMessage("Invalid OTP");
          }
          break;
        case 3:
          // Update password
          if (newPassword !== confirmPassword) {
            setUpdateMessage("Passwords do not match. Please try again.");
            return;
          }
          const updatePasswordResponse = await axios.put(
            `http://localhost:9091/api/v1/updatePassword/${newPassword}`,
            email, // Send email as a string directly
            {
              headers: {
                "Content-Type": "text/plain", // Set the content type to text/plain
              },
            }
          );
          console.log("Password update response:", updatePasswordResponse.data);
          setUpdateMessage(updatePasswordResponse.data.message);
          window.location.replace("/login");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs" sx={{minHeight:"700px"}}>
        <CssBaseline />
        
        <Box
          sx={{
            // marginTop: "20vh",
        
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",
            height:"100vh"
            
            
            
          }}
        >
          
          <Card variant="outlined" sx={{ margin:"auto",textAlign:"center" ,alignItems: "center",flexDirection:"column",borderRadius:'20px' }}>
          <CardContent sx={{textAlign:"center",alignItems: "center"}}>
            
          <Avatar sx={{ marginLeft:"46%",marginBottom:"20px", bgcolor: "primary.main",textAlign:"center",alignItems: "center",}}>
            <LockOutlinedIcon sx={{alignContent:"center"}} />
          </Avatar>
          <Typography component="h1" variant="h5" >
            <b>Forgot Password</b>
          </Typography>
          <img
    src={bg}
  
    style={{ width: "300px", height: "auto", marginBottom: "20px" }}
  />
          <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {step === 1 && (
              
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
                
              
            )}
            {step === 2 && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
                value={otp}
                onChange={handleOtpChange}
              />
            )}
            {step === 3 && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  type="password"
                  autoFocus
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {step === 1 && "SEND OTP"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </Button>
            <Typography variant="body2" color="text.secondary" align="center">
              {verificationMessage}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {updateMessage}
            </Typography>
          </form>
        
        </CardContent>
         </Card>
         </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
