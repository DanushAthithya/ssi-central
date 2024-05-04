import { FilterAlt } from "@mui/icons-material";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Hidden, MenuItem, Slide, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "./User";

const UserList = () => {
  const [empId, setEmpId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [role, setRole] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from REST API
      const response = await axios.get("http://localhost:9090/api/v1/user");
      const responseData = response.data; // Access the data property directly
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    clearFilters();
  };

  const handleEmpIdChange = (event) => {
    setEmpId(event.target.value);
  };

  const handleEmailIdChange = (event) => {
    setEmailId(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleApplyFilter = async () => {
    switch (filterType) {
      case "empId":
        filterByEmpId();
        break;
      case "emailId":
        filterByEmailId();
        break;
      case "role":
        filterByRole();
        break;
      default:
        break;
    }
  };

  const filterByEmpId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/v1/user/filter/byEmpId/${empId}`
      );
      setData(response.data || []);
    } catch (error) {
      console.error("Error filtering data by Employee ID:", error);
    }
  };

  const filterByEmailId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/v1/user/filter/byEmailId/${emailId}`
      );
      setData(response.data || []);
    } catch (error) {
      console.error("Error filtering data by Email ID:", error);
    }
  };

  const filterByRole = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/v1/user/filter/byRole/${role}`
      );
      setData(response.data || []);
    } catch (error) {
      console.error("Error filtering data by Role:", error);
    }
  };

  const clearFilters = () => {
    setEmpId("");
    setEmailId("");
    setRole("");
  };

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", position: "absolute", minWidth:'450px',
          top: "20px",
          right: "20px",
          zIndex: 999, 
          }}>
        {data.map((d) => (
          <Box key={d.empId} mb={2} sx={{ width: "100%" }}>
            <User
              empId={d.empId}
              emailId={d.emailId}
              role={d.role}
              userName={d.userName}
              fullWidth
            />
          </Box>
        ))}
        <Hidden lgUp>
          <Fab
            sx={{ position: "fixed", bottom: "10px", right: "10px" }}
            color="primary"
            aria-label="filter"
            onClick={handleFilterOpen}
          >
            <FilterAlt />
          </Fab>
          <Dialog
            fullScreen
            open={filterOpen}
            onClose={handleFilterClose}
            TransitionComponent={Slide}
          >
            <DialogTitle>Filters</DialogTitle>
            <DialogContent>
              <TextField
                select
                label="Filter"
                value={filterType}
                onChange={handleFilterChange}
                fullWidth
                sx={{mb:3 , mt: 3 }}
              >
                <MenuItem value="empId">Filter by Employee ID</MenuItem>
                <MenuItem value="emailId">Filter by Email ID</MenuItem>
                <MenuItem value="role">Filter by Role</MenuItem>
              </TextField>
              {filterType === "empId" && (
                <TextField
                  label="Employee ID"
                  value={empId}
                  onChange={handleEmpIdChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              )}
              {filterType === "emailId" && (
                <TextField
                  label="Email ID"
                  value={emailId}
                  onChange={handleEmailIdChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              )}
              {filterType === "role" && (
                <TextField
                select
                label="Role"
                value={role}
                onChange={handleRoleChange}
                fullWidth
                sx={{ mb: 3 }}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </TextField>
              )}
              <Button
                variant="contained"
                onClick={handleApplyFilter}
                fullWidth
                sx={{ mb: 3 }}
              >
                Apply
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFilterClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Hidden>
        <Hidden lgDown>
          <Box
            sx={{
              minWidth: "250px",
              maxWidth:"400px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginTop: "20px",
              maxHeight: "45vh",
              position:"fixed",
              right:"10px",
              width: "75%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <TextField
              select
              label="Filter"
              value={filterType}
              onChange={handleFilterChange}
              fullWidth
              sx={{ mb: 3 }}
            >
              <MenuItem value="empId">Filter by Employee ID</MenuItem>
              <MenuItem value="emailId">Filter by Email ID</MenuItem>
              <MenuItem value="role">Filter by Role</MenuItem>
            </TextField>
            {filterType === "empId" && (
              <TextField
                label="Employee ID"
                value={empId}
                onChange={handleEmpIdChange}
                fullWidth
                sx={{ mb: 3 }}
              />
            )}
            {filterType === "emailId" && (
              <TextField
                label="Email ID"
                value={emailId}
                onChange={handleEmailIdChange}
                fullWidth
                sx={{ mb: 3 }}
              />
            )}
            {filterType === "role" && (
              <TextField
              select
              label="Role"
              value={role}
              onChange={handleRoleChange}
              fullWidth
              sx={{ mb: 3 }}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
            )}
            <Button
              variant="contained"
              onClick={handleApplyFilter}
              fullWidth
              sx={{ mb: 3 }}
            >
              Apply
            </Button>
          </Box>
        </Hidden>
      </Box>
    </Container>
  );
  
};

export default UserList;