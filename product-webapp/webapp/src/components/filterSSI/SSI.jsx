import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import FileSaver from 'file-saver';
import React from "react";

const SSI = ({ instructionId, tradeDate, status, counterPartyName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // useEffect(() => {
  //   console.log('createdDate:', createdDate);
  //   console.log('id:',instructionId);
  // }, []); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = async(format,instructionId) => {
    try {
      // Extract instructionIds from data

      // Define the API endpoint based on type
      const endpoint =
          format === "PDF"
          ? "http://localhost:9092/api/v1/ssi/generate-pdf"
          : "http://localhost:9092/api/v1/ssi/generate-csv";

      // Send a POST request to the appropriate endpoint
      const response = await axios.post(
          endpoint,
          instructionId,
          { responseType: "arraybuffer", headers: { "Content-Type": "text/plain" } }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
          type: format === "PDF" ? "application/pdf" : "text/csv",
      });

      // Use FileSaver.js or similar library to save the file
      FileSaver.saveAs(
          blob,
          `SSI_${format.toLowerCase()}.${format === "PDF" ? "pdf" : "csv"}`
      );
  } catch (error) {
      // Handle error
      console.error("Error downloading:", error);
  }
  };

  const handleEdit = () => {
    window.location.href(`/updateSSI/${instructionId}`);
  };

  const handleDelete = () => {
    const response=axios.delete(`http://localhost:9092/api/v1/ssi/delete/${instructionId}`);
    console.log(response.data);
    window.location.reload();
  };

  return (
    <Container>
      <Paper style={{ backgroundColor: '#fff', padding: '24px', marginBottom: '24px', borderRadius: '8px', position: 'relative' ,maxWidth:'300px'}} elevation={3}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="ssi-details">
            <Typography variant="body1" gutterBottom>
              <strong>Instruction ID:</strong> {instructionId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Trade Date:</strong> {tradeDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Status:</strong>{" "}
              <span style={{ color: status === "Completed" ? "green" : "red" }}>
                {status}
              </span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Counterparty:</strong> {counterPartyName}
            </Typography>
          </div>
          <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
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
              <MenuItem onClick={() => handleDownload("PDF",instructionId)}>
                Download PDF
              </MenuItem>
              <MenuItem onClick={() => handleDownload("CSV",instructionId)}>
                Download CSV
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default SSI;
