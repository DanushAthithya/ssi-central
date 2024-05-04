import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React from "react";
const User = ({ empId, emailId, userName, role }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleEdit = () => {
      window.location.replace(`/update-user/${empId}/${emailId}/${userName}/${role}`);
      console.log("Edit");
    };
  
    const handleDelete = async() => {
      const response=await axios.delete(`http://localhost:9090/api/v1/user/${empId}`);
      console.log(response.data);
      window.location.reload();
    };
  
    // const roleColor = role.toLowerCase() === 'admin' ? 'red' : 'green';
  
    return (
      <Container>
        <React.Fragment>
      <br />
      <Table size="large" style={{ width: '60%' }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Employee ID 
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Email ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Username
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Role
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <div>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEdit}>
                <EditIcon /> Update
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteIcon /> Delete
              </MenuItem>
            </Menu>
          </div>
        </TableBody>
        </Table></React.Fragment>
      </Container>
      
    );
  };
  
  export default User;