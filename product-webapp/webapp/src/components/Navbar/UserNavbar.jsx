import { ArrowBackIosRounded } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import logo from "../../Images/GenySys__2_-removebg-preview.png";
const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};
function UserNavbar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };
  // Get user data from localStorage
  const user = localStorage.getItem("user");
  const userName = user ? JSON.parse(user).userName : "";
  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Redirect to login page
    window.location.replace("/login");
  };
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <IconButton
          color="primary"
          aria-label="home"
          onClick={() => window.location.replace("/userHome/")}
          edge="start"
          sx={{
            fontSize: "1.5rem", // Adjust font size
            position: 'absolute',
            left: 40,
            top: 90,
            padding: '8px 16px', // Add padding to increase clickable area
            borderRadius: '16px', // Add border radius to make it look like a button
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // Add background color
            '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
            }
          }}
        >
          <ArrowBackIosRounded />
        </IconButton>
        <Container maxWidth="false">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
              sx={{ mr: 2, fontSize: "50rem" }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                px: "0",
              }}
              onClick={()=>{window.location.replace("/userHome")}}
            >
              <img src={logo} style={logoStyle} alt="logo of genysys" />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {/* Profile Icon and Username */}
              <IconButton color="primary" aria-label="profile">
                <AccountCircleIcon />
                <Typography variant="body2" color="text.primary">
                  {userName}
                </Typography>
              </IconButton>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    width: "250px",
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                    "& .MuiMenuItem-root": {
                      marginBottom: "20px",
                      fontWeight: "bold",
                    },
                  }}
                >
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
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      flexGrow: 1,
                      padding: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {/* Profile Icon and Username in Drawer */}
                    <IconButton color="primary" aria-label="profile">
                      <AccountCircleIcon />
                      <Typography variant="body2" color="text.primary">
                        {userName}
                      </Typography>
                    </IconButton>
                  </Box>
                  <MenuItem
                    onClick={() =>
                      window.location.replace("/userHome/createSSI")
                    }
                  >
                    <AddIcon style={{ marginRight: "15px" }} />
                    Generate SSI
                  </MenuItem>
                  
                  <MenuItem
                    onClick={() =>
                      window.location.replace("/userHome/visualization")
                    }
                  >
                    <BarChartIcon style={{ marginRight: "15px" }} />
                    Visualizations
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      window.location.replace("/userHome/ssiFilter")
                    }
                  >
                    <ListIcon style={{ marginRight: "15px" }} />
                    SSI List
                  </MenuItem>
                  {/* Add Logout Button */}
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon style={{ marginRight: "15px" }} />
                    Logout
                  </MenuItem>
                  <Divider />
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default UserNavbar;