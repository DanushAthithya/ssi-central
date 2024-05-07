import { Box, alpha } from "@mui/material";
import UserNavbar from "../Navbar/UserNavbar";
import ChartController from "../charts/ChartController";




const VisualisationHome = () => {
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
        <UserNavbar />
        <ChartController/>
      </Box>
  );
};

export default VisualisationHome;
