import {
  Box,
  Button,
  Container,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Form.css";

function getSteps() {
  return [
    "Basic Information",
    "Transaction Details",
    "Account Details",
    "Asset Information",
    "Final Details",
  ];
}

function Form() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [formData, setFormData] = useState({
    counterPartyAccountNumber: "",
    counterPartyName: "",
    counterPartyEmail: "",
    swiftCode: "",
    transactionType: "",
    status: "",
    assetDetails: "",
    assetType: "",
    numberOfAsset: "",
    createdDate: "",
    deadlineDate: "",
    amountCurrencyType: "",
    amount: "",
    intermediaryAccountNumber: "",
    beneficiaryAccountNumber: "",
    beneficiaryAccountName: "",
    createdByName: "",
    reference: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    instructionId: false,
    counterPartyAccountNumber: false,
    beneficiaryAccountNumber: false,
    counterPartyEmail: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // Perform validation
    const errors = { ...validationErrors };
    if (name === "instructionId" && !/^\d+$/.test(value)) {
      errors.instructionId = true;
    } else if (name === "counterPartyAccountNumber" && !/^\d+$/.test(value)) {
      errors.counterPartyAccountNumber = true;
    } else if (name === "beneficiaryAccountNumber" && !/^\d+$/.test(value)) {
      errors.beneficiaryAccountNumber = true;
    } else if (name === "counterPartyEmail" && !value.includes("@")) {
      errors.counterPartyEmail = true;
    } else {
      errors[name] = false;
    }

    setValidationErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9092/api/v1/ssi/add/",
        formData
      );
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {
        window.location.replace("/userHome/ssiFilter");
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const generateValue = () => {
    setFormData((prevState) => ({
      ...prevState,
      reference: "GeneratedRef-" + Math.random().toString(36).substr(2, 9),
    }));
  };

  useEffect(() => {
    // Set the current date when the component mounts
    setFormData((prevFormData) => ({
      ...prevFormData,
      createdDate: new Date().toISOString().slice(0, 10), // Format date to YYYY-MM-DD
      userId: JSON.parse(localStorage.getItem("user")).empId,
      userEmailId: JSON.parse(localStorage.getItem("user")).emailId,
    }));
  }, []);

  const stepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              paddingTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "1vh",
                marginTop: "10px",
                marginBottom: "1vh",
              }}
            >
              <TextField
                label="Counter Party Account Number"
                name="counterPartyAccountNumber"
                value={formData.counterPartyAccountNumber}
                onChange={handleInputChange}
                required
                error={validationErrors.counterPartyAccountNumber}
                helperText={
                  validationErrors.counterPartyAccountNumber
                    ? "Please enter only integers"
                    : ""
                }
                sx={{ width: "100%" }}
                InputProps={{ style: { color: "black" } }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "1vh", marginBottom: "1vh" }}>
              <TextField
                label="Counter Party Name"
                name="counterPartyName"
                value={formData.counterPartyName}
                onChange={handleInputChange}
                required
                sx={{ width: "50%", marginRight: "1vh" }}
                InputProps={{ style: { color: "black" } }}
              />
              <TextField
                label="Counter Party Email"
                name="counterPartyEmail"
                value={formData.counterPartyEmail}
                onChange={handleInputChange}
                required
                error={validationErrors.counterPartyEmail}
                helperText={
                  validationErrors.counterPartyEmail
                    ? "Please enter a valid email address"
                    : ""
                }
                sx={{ width: "50%" }}
                InputProps={{ style: { color: "black" } }}
              />
            </Box>
            <TextField
              label="Swift Code"
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleInputChange}
              required
              fullWidth
              InputProps={{ style: { color: "black" } }}
            />
          </Box>
        );
      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              paddingTop: "20px",
              marginBottom: "1vh",
            }}
          >
            <TextField
              select
              label="Transaction Type"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleInputChange}
              required
              fullWidth
              InputProps={{ style: { color: "black" } }}
            >
              {["Cash", "Cheque", "NIFT/RTGS"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: "flex", gap: "1vh" }}>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                sx={{ width: "50%", marginTop: "2vh", marginBottom: "2vh" }}
                InputProps={{ style: { color: "black" } }}
              >
                {["Completed", "Not Completed"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Asset Details"
                name="assetDetails"
                value={formData.assetDetails}
                onChange={handleInputChange}
                required
                sx={{
                  width: "50%",
                  marginTop: "2vh",
                  marginLeft: "1vh",
                  marginBottom: "2vh",
                }}
                InputProps={{ style: { color: "black" } }}
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
              InputProps={{ style: { color: "black" } }}
            >
              {["Equity", "Forex", "Mutual Funds", "Sovereign Gold Bonds"].map(
                (option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                )
              )}
            </TextField>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1vh",
                marginTop: "3vh",
                marginBottom: "2vh",
              }}
            >
              <Box sx={{ display: "flex", gap: "1vh" }}>
                <TextField
                  label="Deadline Date"
                  name="deadlineDate"
                  type="date"
                  value={formData.deadlineDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                  required
                  sx={{
                    width: "100%",
                    marginBottom: "2vh",
                    marginRight: "2vh",
                  }}
                  InputProps={{ style: { color: "black" } }}
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
                  sx={{ width: "100%" }}
                  InputProps={{ style: { color: "black" } }}
                />
                <TextField
                  label="Number of Asset"
                  name="numberOfAsset"
                  type="number"
                  value={formData.numberOfAsset}
                  onChange={handleInputChange}
                  required
                  sx={{ width: "50%" }} // Adjusted for equal spacing without enlarging
                  InputProps={{
                    style: { color: "black" },
                    inputProps: { min: 0 },
                  }} // Added min property here
                />
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  sx={{ width: "50%" }} // Adjusted for equal spacing without enlarging
                  InputProps={{ style: { color: "black" } ,inputProps:{min:0}}}
                />
                <TextField
                  select
                  label="Currency Type"
                  name="amountCurrencyType"
                  value={formData.amountCurrencyType}
                  onChange={handleInputChange}
                  required
                  sx={{ width: "50%", marginLeft: "2vh" }} // Adjusted for equal spacing without enlarging
                  InputProps={{ style: { color: "black" } }}
                >
                  {[
                    "USD",
                    "EUR",
                    "INR",
                    "AUD",
                    "CAD",
                    "CNY",
                    "SEK",
                    "NZD",
                    "JPY",
                    "GBP",
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <TextField
              select
              label="Denomination"
              name="denomination"
              value={formData.denomination}
              onChange={handleInputChange}
              required
              sx={{ width: "100%", marginTop: "2vh" }}
              InputProps={{ style: { color: "black" } }}
            >
              {["Million", "Billion", "Trillion"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );

      case 3:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              marginTop: "2vh",
            }}
          >
            <Box sx={{ display: "flex", gap: "1vh", marginTop: "10px" }}>
              <TextField
                label="Intermediary Account Number"
                name="intermediaryAccountNumber"
                value={formData.intermediaryAccountNumber}
                onChange={handleInputChange}
                required
                sx={{ width: "50%", marginRight: "2vh", marginBottom: "2vh" }}
                InputProps={{ style: { color: "black" } }}
              />
              <TextField
                label="Beneficiary Account Number"
                name="beneficiaryAccountNumber"
                value={formData.beneficiaryAccountNumber}
                onChange={handleInputChange}
                required
                error={validationErrors.beneficiaryAccountNumber}
                helperText={
                  validationErrors.beneficiaryAccountNumber
                    ? "Please enter only integers"
                    : ""
                }
                sx={{ width: "50%", marginBottom: "2vh" }}
                InputProps={{ style: { color: "black" } }}
              />
            </Box>
            <TextField
              label="Beneficiary Account Name"
              name="beneficiaryAccountName"
              value={formData.beneficiaryAccountName}
              onChange={handleInputChange}
              required
              fullWidth
              InputProps={{ style: { color: "black" } }}
            />
          </Box>
        );
      case 4:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              marginTop: "2vh",
            }}
          >
            <Box sx={{ display: "flex", gap: "1vh", marginTop: "10px" }}>
              <TextField
                label="User ID:"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
                disabled
                sx={{ width: "100%", marginBottom: "2vh" }}
                InputProps={{ style: { color: "black" } }}
              />
              <TextField
                label="User Email ID:"
                name="userEmailId"
                value={formData.userEmailId}
                onChange={handleInputChange}
                required
                disabled
                sx={{ width: "100%", marginBottom: "2vh", marginLeft: "2vh" }}
                InputProps={{ style: { color: "black" } }}
              />
            </Box>
            <TextField
              label="Reference"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              required
              fullWidth
              InputProps={{ style: { color: "black" } }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                onClick={generateValue}
                color="primary"
              >
                Generate
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: "150px",
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(10,0,0,10)", // Adjusted the opacity for the shadow
        padding: "20px",
      }}
    >
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
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              disabled={activeStep === steps.length - 1}
              onClick={handleNext}
              color="primary"
            >
              Next
            </Button>
            <Button
              disabled={activeStep !== steps.length - 1}
              type="submit"
              color="primary"
            >
              Finish
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
}

export default Form;
