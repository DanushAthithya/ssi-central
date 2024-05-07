import { Box, alpha } from "@mui/material";
import AdminNavbar from "../Navbar/AdminNavbar";
import UserList from "../filterUser/UserList";




const UserListHome = () => {
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
        <AdminNavbar />
        <UserList />
      </Box>
  );
};

export default UserListHome;
