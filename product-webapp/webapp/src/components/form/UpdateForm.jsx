import { Box, Button, Container, MenuItem, Step, StepLabel, Stepper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Form.css';

function getSteps() {
    return ['Basic Information', 'Transaction Details', 'Account Details', 'Asset Information', 'Final Details'];
  }


function UpdateForm() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [formData, setFormData] = useState({
    instructionId: '',
    counterPartyAccountNumber: '',
    counterPartyName: '',
    counterPartyEmail: '',
    swiftCode: '',
    transactionType: '',
    status: '',
    assetDetails: '',
    assetType: '',
    numberOfAsset: '',
    createdDate: '',
    deadlineDate: '',
    amountCurrencyType: '',
    amount: '',
    intermediaryAccountNumber: '',
    beneficiaryAccountNumber: '',
    beneficiaryAccountName: '',
    createdByName: '',
    reference: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    instructionId: false,
    counterPartyAccountNumber: false,
    beneficiaryAccountNumber: false,
    counterPartyEmail: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    // Handle input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    const response=await axios.put(`http://localhost:9092/api/v1/ssi/update/${formData.instructionId}`,{...formData});
    console.log(response.data);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const generateValue = () => {
    setFormData(prevState => ({ ...prevState, reference: 'GeneratedRef-' + Math.random().toString(36).substr(2, 9) }));
  };

  useEffect(() => {
    try {
      const SSI = JSON.parse(localStorage.getItem("ssi"))[0];
      if (SSI) {
        // Data is available in local storage
        setFormData({ ...SSI });
      } else {
        // Data is not available or invalid, set default values
        setFormData({
          instructionId: '',
          counterPartyAccountNumber: '',
          counterPartyName: '',
          counterPartyEmail: '',
          swiftCode: '',
          transactionType: '',
          status: '',
          assetDetails: '',
          assetType: '',
          numberOfAsset: '',
          createdDate: '',
          deadlineDate: '',
          amountCurrencyType: '',
          amount: '',
          intermediaryAccountNumber: '',
          beneficiaryAccountNumber: '',
          beneficiaryAccountName: '',
          createdByName: '',
          reference: ''
        });
      }
    } catch (error) {
      // Error handling for parsing or other errors
      console.error("Error parsing SSI from local storage:", error);
      // Set default values or handle the error as appropriate
    }
  }, []);
  
  

  const stepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
            <Box sx={{ display: 'flex', gap: '1vh' ,marginTop:'10px'}}>
              <TextField
                label="Instruction Id"
                name="instructionId"
                value={formData.instructionId}
                onChange={handleInputChange}
                required
                disabled
                error={validationErrors.instructionId}
                helperText={validationErrors.instructionId ? 'Please enter only integers' : ''}
                sx={{ width: '50%' }}
              />
              <TextField
                label="Counter Party Account Number"
                name="counterPartyAccountNumber"
                value={formData.counterPartyAccountNumber}
                onChange={handleInputChange}
                required
                error={validationErrors.counterPartyAccountNumber}
                helperText={validationErrors.counterPartyAccountNumber ? 'Please enter only integers' : ''}
                sx={{ width: '50%' }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: '1vh' }}>
              <TextField
                label="Counter Party Name"
                name="counterPartyName"
                value={formData.counterPartyName}
                onChange={handleInputChange}
                required
                sx={{ width: '50%' }}
              />
              <TextField
                label="Counter Party Email"
                name="counterPartyEmail"
                value={formData.counterPartyEmail}
                onChange={handleInputChange}
                required
                error={validationErrors.counterPartyEmail}
                helperText={validationErrors.counterPartyEmail ? 'Please enter a valid email address' : ''}
                sx={{ width: '50%' }}
              />
            </Box>
            <TextField
              label="Swift Code"
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vh',paddingTop:'20px'}}>
            <TextField
              select
              label="Transaction Type"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleInputChange}
              required
              fullWidth
            >
              {["Cash", "Cheque", "NIFT/RTGS"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'flex', gap: '1vh' }}>
              <TextField
              select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                sx={{ width: '50%' }}
              >
                {['Completed', 'Not Completed'].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
              </TextField>
              <TextField
                label="Asset Details"
                name="assetDetails"
                value={formData.assetDetails}
                onChange={handleInputChange}
                required
                sx={{ width: '50%' }}
              />
            </Box>
            <TextField
              select
              label="Asset Type"
              name="assetType"
              value={formData.assetType}
              onChange={handleInputChange}
              required
              fullWidth
            >
              {['Equity', 'Forex', 'Mutual Funds','Government Bonds','Sovereign Gold Bonds'].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
              </TextField>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vh' ,marginTop:'10px'}}>
              <Box sx={{ display: 'flex', gap: '1vh' }}>
                <TextField
                  label="Deadline Date"
                  name="deadlineDate"
                  type="date"
                  value={formData.deadlineDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                  required
                  sx={{ width: '100%' }}
                />
                <TextField
                  label="Created Date"
                  name="createdDate"
                  type="date"
                  value={formData.createdDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                  required
                  disabled
                  sx={{ width: '100%' }}
                />
                <TextField
                  label="Number of Asset"
                  name="numberOfAsset"
                  type="number"
                  value={formData.numberOfAsset}
                  onChange={handleInputChange}
                  required
                  sx={{ width: "100%" }} // Adjusted for equal spacing without enlarging
                  InputProps={{ style: { color: "black" } }}
                />
              </Box>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </Box>
            <TextField
              select
              label="Currency Type"
              name="amountCurrencyType" // Corrected the state property name
              value={formData.amountCurrencyType}
              onChange={handleInputChange}
              required
              fullWidth
            >
              {['USD', 'EUR', 'INR', 'AUD', 'CAD', 'CNY', 'SEK', 'NZD', 'JPY', 'GBP'].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Denomination"
              name="denomination" // Corrected the state property name
              value={formData.denomination}
              onChange={handleInputChange}
              required
              fullWidth
            >
              {['Million', 'Billion','Trillion'].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
            <Box sx={{ display: 'flex', gap: '1vh',marginTop:'10px' }}>
              <TextField
                label="Intermediary Account Number"
                name="intermediaryAccountNumber"
                value={formData.intermediaryAccountNumber}
                onChange={handleInputChange}
                required
                sx={{ width: '50%' }}
              />
              <TextField
                label="Beneficiary Account Number"
                name="beneficiaryAccountNumber"
                value={formData.beneficiaryAccountNumber}
                onChange={handleInputChange}
                required
                error={validationErrors.beneficiaryAccountNumber}
                helperText={validationErrors.beneficiaryAccountNumber ? 'Please enter only integers' : ''}
                sx={{ width: '50%' }}
              />
            </Box>
            <TextField
              label="Beneficiary Account Name"
              name="beneficiaryAccountName"
              value={formData.beneficiaryAccountName}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
        );
      case 4:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
            <Box sx={{ display: 'flex', gap: '1vh',marginTop:'10px' }}>
              <TextField
                label="User ID:"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
                disabled
                sx={{ width: '100%' }}
              />
              <TextField
                label="User Email ID:"
                name="userEmailId"
                value={formData.userEmailId}
                onChange={handleInputChange}
                required
                disabled
                sx={{ width: '100%' }}
              />
            </Box>
            <TextField
              label="Reference"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
  <Button variant="contained" onClick={generateValue}>Generate</Button>
</Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '150px', textAlign: 'center' }}>
      <div className="Form">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {stepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Back</Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button disabled={activeStep===steps.length-1} onClick={handleNext}>
              Next
            </Button>
            <Button disabled={activeStep!== steps.length-1} type='submit'>
              Finish
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
}

export default UpdateForm;
