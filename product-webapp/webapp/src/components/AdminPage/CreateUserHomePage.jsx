import { Box, alpha } from "@mui/material";
import AdminNavbar from "../Navbar/AdminNavbar";
import CreateUser from "../Registration/CreateUser";




const CreateUserHomePage = () => {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        position:"absolute",
        top:"0",
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
       <div style={{position:"absolute", top:"13vh",right:"44vw",fontSize:"40px"}}>Create User</div>
        <AdminNavbar />
        <CreateUser />
      </Box>
  );
};

export default CreateUserHomePage;
