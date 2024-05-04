import { FilterAlt } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    Hidden,
    Menu,
    MenuItem,
    Slide,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import FileSaver from "file-saver"; // Import FileSaver.js or similar library
import React, { useEffect, useState } from "react";
import SSI from "./SSI";

const SSIList = () => {
  const [filterType, setFilterType] = useState("Filter by Date");
  const [counterPartyName, setCounterPartyName] = useState("");
  const [instructionId, setInstructionId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [assetType, setAssetType] = useState("");
  const [anchorEl, setAnchorEl] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from REST API
      const response = await axios.get("http://localhost:9092/api/v1/ssi/");
      const responseData = response.data; // Access the data property directly
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleApplyFilter = () => {
    switch (filterType) {
      case "Filter by Date":
        filterSSIByDate(fromDate, toDate);
        break;
      case "Filter by Counterparty":
        filterSSIByCounterParty(counterPartyName);
        break;
      case "Filter by Instruction ID":
        filterSSIByInstructionID(instructionId);
        break;
      case "Filter by Status":
        filterSSIByStatus(status);
        break;
      case "Filter by Asset Type":
        filterSSIByAssetType(assetType);
        break;
      default:
        break;
    }
  };

  const filterSSIByDate = async (fromDate, toDate) => {
    try {
      const response = await axios.get(
        `http://localhost:9092/api/v1/ssi/filter/byDateRange/${fromDate}/${toDate}`
      );
      setData(response.data || []); // If response.data is null, set an empty array
    } catch (error) {
      console.error("Error filtering data by date:", error);
    }
  };

  const filterSSIByCounterParty = async (counterPartyName) => {
    try {
      const response = await axios.get(
        `http://localhost:9092/api/v1/ssi/filter/byCounterParty/${counterPartyName}`
      );
      setData(response.data || []);
    } catch (error) {
      console.error("Error filtering data by counterparty:", error);
    }
  };

  const filterSSIByInstructionID = async (instructionId) => {
    try {
      const response = await axios.get(
        `http://localhost:9092/api/v1/ssi/check/${instructionId}`
      );
      setData(response.data || []);
    } catch (error) {
      console.error("Error filtering data by instruction ID:", error);
    }
  };

  const filterSSIByStatus = async (status) => {
    try {
      const response = await axios.get(
        `http://localhost:9092/api/v1/ssi/filter/byStatus/${status}`
      );
      setData(response.data || []);
    } catch (error) {
      console.error("Error filtering data by status:", error);
    }
  };

  const filterSSIByAssetType = async (assetType) => {
    try {
      const response = await axios.get(
        `http://localhost:9092/api/v1/ssi/filter/byAssetType/${assetType}`
      );
      setData(response.data || []);
    } catch (error) {
      console.error("Error filtering data by asset type:", error);
    }
  };

  const handleDownloadAll = async (type) => {
    try {
        // Extract instructionIds from data
        const instructionIds = data.map((d) => d.instructionId).join("&");

        // Define the API endpoint based on type
        const endpoint =
            type === "PDF"
            ? "http://localhost:9092/api/v1/ssi/generate-pdf"
            : "http://localhost:9092/api/v1/ssi/generate-csv";

        // Send a POST request to the appropriate endpoint
        const response = await axios.post(
            endpoint,
            instructionIds,
            { responseType: "arraybuffer", headers: { "Content-Type": "text/plain" } }
        );

        // Create a Blob from the response data
        const blob = new Blob([response.data], {
            type: type === "PDF" ? "application/pdf" : "text/csv",
        });

        // Use FileSaver.js or similar library to save the file
        FileSaver.saveAs(
            blob,
            `SSI_${type.toLowerCase()}.${type === "PDF" ? "pdf" : "csv"}`
        );
    } catch (error) {
        // Handle error
        console.error("Error downloading:", error);
    }
};

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          {data.map((d) => (
            <Grid
              item
              key={d.instructionId}
              xs={12}
              sm={6}
              lg={4}
              sx={{ minWidth: "350px" }}
            >
              <SSI
                instructionId={d.instructionId}
                counterPartyName={d.counterPartyName}
                tradeDate={d.createdDate}
                status={d.status}
              />
            </Grid>
          ))}
        </Grid>
        {/* Render filter box as a popup for smaller devices */}
        <Hidden mdUp>
          <Fab
            sx={{ position: "absolute", top: "0", right: "5%" }}
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
              {/* Filter options */}
              <TextField
                select
                value={filterType}
                onChange={handleFilterChange}
                label="Filter"
                fullWidth
                sx={{mt:2, mb: 3 }}
              >
                <MenuItem value="Filter by Date">Filter by Date</MenuItem>
                <MenuItem value="Filter by Counterparty">
                  Filter by Counterparty
                </MenuItem>
                <MenuItem value="Filter by Instruction ID">
                  Filter by Instruction ID
                </MenuItem>
                <MenuItem value="Filter by Status">Filter by Status</MenuItem>
                <MenuItem value="Filter by Asset Type">
                  Filter by Asset Type
                </MenuItem>
              </TextField>
              {filterType === "Filter by Date" && (
                <>
                  <TextField
                    label="From Date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    label="To Date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </>
              )}
              {filterType === "Filter by Counterparty" && (
                <TextField
                  label="Counterparty"
                  value={counterPartyName}
                  onChange={(e) => setCounterPartyName(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              )}
              {filterType === "Filter by Instruction ID" && (
                <TextField
                  label="Instruction ID"
                  value={instructionId}
                  onChange={(e) => setInstructionId(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              )}
              {filterType === "Filter by Status" && (
                <TextField
                  select
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Not Completed">Not Completed</MenuItem>
                </TextField>
              )}
              {filterType === "Filter by Asset Type" && (
                <TextField
                  select
                  label="Transaction Type"
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="Equity">Equity</MenuItem>
                  <MenuItem value="Forex">Forex</MenuItem>
                  <MenuItem value="Mutual Funds">Mutual Funds</MenuItem>
                  <MenuItem value="Sovereign Gold Bonds">
                    Sovereign Gold Bonds
                  </MenuItem>
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
              <Button
                variant="contained"
                onClick={handleMenuOpen}
                fullWidth
                sx={{ mb: 3 }}
              >
                Download
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => handleDownloadAll("PDF")}>
                  Download PDF
                </MenuItem>
                <MenuItem onClick={() => handleDownloadAll("CSV")}>
                  Download CSV
                </MenuItem>
              </Menu>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFilterClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Hidden>
        {/* Render filter box as a sidebar for larger devices */}
        <Hidden mdDown>
          <Box
            sx={{
              minWidth: "250px",
              maxWidth:"400px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginTop: "20px",
              maxHeight: "45vh",
              position:"absolute",
              right:"5vw",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            {/* Filter options */}
            <TextField
              select
              value={filterType}
              onChange={handleFilterChange}
              label="Filter"
              fullWidth
              className="mb-3"
              sx={{ mb: 3 }}
            >
              <MenuItem value="Filter by Date">Filter by Date</MenuItem>
              <MenuItem value="Filter by Counterparty">
                Filter by Counterparty
              </MenuItem>
              <MenuItem value="Filter by Instruction ID">
                Filter by Instruction ID
              </MenuItem>
              <MenuItem value="Filter by Status">Filter by Status</MenuItem>
              <MenuItem value="Filter by Asset Type">
                Filter by Asset Type
              </MenuItem>
            </TextField>
            {filterType === "Filter by Date" && (
              <>
                <TextField
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="To Date"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              </>
            )}
            {filterType === "Filter by Counterparty" && (
              <TextField
                label="Counterparty"
                value={counterPartyName}
                onChange={(e) => setCounterPartyName(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
            )}
            {filterType === "Filter by Instruction ID" && (
              <TextField
                label="Instruction ID"
                value={instructionId}
                onChange={(e) => setInstructionId(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              />
            )}
            {filterType === "Filter by Status" && (
              <TextField
                select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Not Completed">Not Completed</MenuItem>
              </TextField>
            )}
            {filterType === "Filter by Asset Type" && (
              <TextField
                select
                label="Asset Type"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              >
                <MenuItem value="Equity">Equity</MenuItem>
                <MenuItem value="Forex">Forex</MenuItem>
                <MenuItem value="Mutual Funds">Mutual Funds</MenuItem>
                <MenuItem value="Sovereign Gold Bonds">
                  Sovereign Gold Bonds
                </MenuItem>
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
            <Button
              variant="contained"
              onClick={handleMenuOpen}
              fullWidth
              sx={{ mb: 3 }}
            >
              Download
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleDownloadAll("PDF")}>
                Download PDF
              </MenuItem>
              <MenuItem onClick={() => handleDownloadAll("CSV")}>
                Download CSV
              </MenuItem>
            </Menu>
          </Box>
        </Hidden>
      </Box>
    </Container>
  );
};

export default SSIList;
