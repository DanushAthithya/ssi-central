import { Button, Container, Grid, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserList() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:9090/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (empId, emailId, userName, role) => {
    localStorage.setItem("user-edit",JSON.stringify({empId,emailId,userName,role}));
    window.location.replace("/adminHome/updateUser")
  };

  const handleDelete = async (empId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:9090/api/v1/user/${empId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container sx={{marginTop:"10vh"}}>
      <h1 className='text-center mt-4'>User List</h1>
      <Grid container spacing={-35} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <Tooltip title="Search for Users" >
          <TextField
            fullWidth
            variant='outlined'
            sx={{minWidth:"500px"}}
            margin='normal'
            
            label='Search users'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <i className='fa fa-search'></i>
                </InputAdornment>
              )
            }}
          />
          </Tooltip>
        </Grid>
      </Grid>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Email ID</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell> {/* New column for buttons */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.userName.toLowerCase().includes(search.toLowerCase());
            })
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.userName}</TableCell>
                <TableCell>{item.empId}</TableCell>
                <TableCell>{item.emailId}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item.empId, item.emailId, item.userName, item.role)} sx={{ marginLeft: -5 }} >Edit</Button>
                  <Button onClick={() => handleDelete(item.empId)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default UserList;
