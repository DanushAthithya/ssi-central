import { Box, alpha } from "@mui/material";
import UserNavbar from "../Navbar/UserNavbar";
import Form from "../form/Form";




const FormHomePage = () => {
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
        <div style={{position:"absolute", top:"13vh",right:"45vw",fontSize:"40px"}}>Generate SSI</div>
        <UserNavbar />
        <Form />
      </Box>
  );
};

export default FormHomePage;
