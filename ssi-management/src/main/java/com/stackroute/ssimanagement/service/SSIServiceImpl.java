package com.stackroute.ssimanagement.service;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.stackroute.ssimanagement.exception.InvalidAmountException;
import com.stackroute.ssimanagement.exception.InvalidDateRangeException;
import com.stackroute.ssimanagement.exception.InvalidEmailId;
import com.stackroute.ssimanagement.exception.InvalidSSIId;
import com.stackroute.ssimanagement.model.SSI;
import com.stackroute.ssimanagement.repository.SSIRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class SSIServiceImpl implements SSIService{
	
	@Autowired
	private SSIRepository ssiRespository;

	@Autowired
    private JavaMailSender emailSender;
	
	@Override
	public SSI addSSI(SSI ssi) throws InvalidEmailId {
		this.sendMailSSI(ssi.getCounterPartyEmail(), ssi);
		return ssiRespository.save(ssi);
	}

	@Override
	public List<SSI> displaySSIList() {
		List<SSI> ssiList=ssiRespository.findAll();
		return ssiList;
	}

	@Override
	public boolean updateSSI(SSI ssi) throws InvalidSSIId {
		if(ssiRespository.existsById(ssi.getInstructionId()))
		{
			ssiRespository.save(ssi);
			return true;
		}else{
			throw new InvalidSSIId("Invalid SSI Id");
		}
		// return false;
	}

	@Override
	public boolean deleteSSI(int instructionId) throws InvalidSSIId {
		if (ssiRespository.existsById(instructionId)) {
			ssiRespository.deleteById(instructionId);
			return true;
		}else{
			throw new InvalidSSIId("Invalid SSI Id");
		}
	}

	@Override
public void sendMailSSI(String counterPartyEmail, SSI ssi) throws InvalidEmailId {
    String subject = "Generated SSI";
    String htmlBody = "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
        "<style>" +
        "body {" +
        "font-family: Arial, sans-serif;" +
        "margin: 0;" +
        "padding: 0;" +
        "background-color: #f4f4f4;" +
        "color: #333;" +
        "}" +
        ".container {" +
        "background-color: #ffffff;" +
        "width: 600px;" +
        "margin: 20px auto;" +
        "padding: 20px;" +
        "box-shadow: 0 0 10px rgba(0,0,0,0.1);" +
        "border-top: 5px solid #3498db;" +
        "border-radius: 10px;" +
        "}" +
        ".header {" +
        "background: linear-gradient(145deg, #3498db, #9b59b6);" +
        "color: white;" +
        "padding: 20px;" +
        "font-size: 24px;" +
        "text-align: center;" +
        "border-top-left-radius: 8px;" +
        "border-top-right-radius: 8px;" +
        "}" +
        "table {" +
        "width: 100%;" +
        "border-collapse: collapse;" +
        "margin-top: 20px;" +
        "}" +
        "th, td {" +
        "border: 1px solid #dddddd;" +
        "text-align: left;" +
        "padding: 8px;" +
        "font-size: 16px;" +
        "}" +
        "th {" +
        "background-color: #f8f8f8;" +
        "font-weight: bold;" +
        "}" +
        "tr:nth-child(even) {" +
        "background-color: #f9f9f9;" +
        "}" +
        "tr:hover {" +
        "background-color: #e1e1e1;" + // Hover effect for rows
        "}" +
        ".footer {" +
        "text-align: center;" +
        "font-size: 14px;" +
        "padding: 20px;" +
        "background-color: #f1f1f1;" +
        "border-bottom-left-radius: 8px;" +
        "border-bottom-right-radius: 8px;" +
        "}" +
        "</style>" +
        "</head>" +
        "<body>" +
        "<div class='container'>" +
        "<div class='header'>" +
        "SSI Details" +
        "</div>" +
        "<table>" +
        "<tr><th>Instruction ID:</th><td>" + ssi.getInstructionId() + "</td></tr>" +
        "<tr><th>Counterparty Account Number:</th><td>" + ssi.getCounterPartyAccountNumber() + "</td></tr>" +
        "<tr><th>Counterparty Name:</th><td>" + ssi.getCounterPartyName() + "</td></tr>" +
        "<tr><th>Counterparty Email:</th><td>" + ssi.getCounterPartyEmail() + "</td></tr>" +
        "<tr><th>SWIFT Code:</th><td>" + ssi.getSwiftCode() + "</td></tr>" +
        "<tr><th>Transaction Type:</th><td>" + ssi.getTransactionType() + "</td></tr>" +
        "<tr><th>Status:</th><td>" + ssi.getStatus() + "</td></tr>" +
        "<tr><th>Asset Details:</th><td>" + ssi.getAssetDetails() + "</td></tr>" +
        "<tr><th>Asset Type:</th><td>" + ssi.getAssetType() + "</td></tr>" +
        "<tr><th>Number of Assets:</th><td>" + ssi.getNumberOfAsset() + "</td></tr>" +
        "<tr><th>Created Date:</th><td>" + ssi.getCreatedDate() + "</td></tr>" +
        "<tr><th>Deadline Date:</th><td>" + ssi.getDeadlineDate() + "</td></tr>" +
        "<tr><th>Amount Currency Type:</th><td>" + ssi.getAmountCurrencyType() + "</td></tr>" +
        "<tr><th>Denomination:</th><td>" + ssi.getDenomination() + "</td></tr>" +
        "<tr><th>Amount:</th><td>" + ssi.getAmount() + "</td></tr>" +
        "<tr><th>Intermediary Account Number:</th><td>" + ssi.getIntermediaryAccountNumber() + "</td></tr>" +
        "<tr><th>Beneficiary Account Number:</th><td>" + ssi.getBeneficiaryAccountNumber() + "</td></tr>" +
        "<tr><th>Beneficiary Account Name:</th><td>" + ssi.getBeneficiaryAccountName() + "</td></tr>" +
        "<tr><th>User ID:</th><td>" + ssi.getUserId() + "</td></tr>" +
        "<tr><th>User EmailID:</th><td>" + ssi.getUserEmailId() + "</td></tr>" +
        "<tr><th>Reference:</th><td>" + ssi.getReference() + "</td></tr>" +
        "</table>" +
        "<div class='footer'>" +
        "Need help? Contact us at support@example.com" +
        "</div>" +
        "</div>" +
        "</body>" +
        "</html>";

		MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());

        try {
            helper.setFrom("danushathithya24@gmail.com");
            helper.setTo(counterPartyEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            
            emailSender.send(message);
        } catch (MessagingException e) {
			e.printStackTrace();
			throw new InvalidEmailId("Invalid Email Id - Counld sent mail");
        }
	}

	@Override
	public List<SSI> filterSSIByDate(Date startDate, Date endDate) throws InvalidDateRangeException  {
		if (endDate.before(startDate)) {
			throw new InvalidDateRangeException("End date cannot be before start date");
		}
			return ssiRespository.filterSSIByDate(startDate, endDate);
		
	}
	@Override
	public List<SSI> filterSSIByCounterPartyName(String counterPartyName) {
        return ssiRespository.findByCounterPartyNameIgnoreCase(counterPartyName);
	}
	@Override
	public List<SSI> filterSSIByAmount(BigDecimal minAmount, BigDecimal maxAmount) throws InvalidAmountException {
		if((maxAmount.compareTo(minAmount))>0){
			throw new InvalidAmountException("Invalid Amount");
		}
		return ssiRespository.findByAmountBetween(minAmount,maxAmount);
	}

	@Override
	public List<SSI> checkSSIByIds(String instructionIds[]) throws InvalidSSIId{
		List<SSI> ssis=new ArrayList<>();
		for(String instructionIdd:instructionIds)
		{
			int instructionId=Integer.parseInt(instructionIdd);
			if(ssiRespository.existsById(instructionId))
			{
				Optional<SSI> ssi=ssiRespository.findById(instructionId);
				if(ssi.isPresent())
				{
					ssis.add(ssi.get());
				}
			}
		}
		return ssis;
	}

	@Override
	public void sendDeadlineNotification(String counterPartyEmail,String userEmailId,String htmlBody) throws InvalidEmailId {
		String subject="SSI Deadline Notification";
		MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());

        try {
            helper.setFrom("danushathithya24@gmail.com");
            helper.setTo(counterPartyEmail);
			helper.addTo(userEmailId);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
			throw new InvalidEmailId("Couldn't Send mail- Invalid Email");
        }
	}

	@Override
	public List<SSI> filterSSIByAssetType(String assetType) {
		return ssiRespository.findByAssetType(assetType);
	}

	@Override
	public List<SSI> filterSSIByAssetRange(int minAssetNo,int maxAssetNo) {
		return ssiRespository.findByNumberOfAsset(minAssetNo,maxAssetNo);
	}

	@Override
	public List<SSI> filterSSIByTransactionType(String transactionType) {
		return ssiRespository.findByTransactionType(transactionType);
	}
	
	public List<SSI> filterSSIByStatus(String status) {
		return ssiRespository.findByStatus(status);
	}
	
	@Override
	public List<SSI> filterSSIByCounterPartyName(String counterPartyName,String userEMailId) {
        return ssiRespository.findByCounterPartyNameIgnoreCaseAndUserEmailId(counterPartyName,userEMailId);
	}
	@Override
	public List<SSI> filterSSIByDate(Date startDate, Date endDate, String userEmailId) throws InvalidDateRangeException {
		if (endDate.before(startDate)) {
			throw new InvalidDateRangeException("End date cannot be before start date");
		}
		return ssiRespository.filterSSIByDateAndUserEmailId(startDate, endDate,userEmailId);
	}

	@Override
	public List<SSI> filterSSIByAmount(BigDecimal minAmount, BigDecimal maxAmount, String userEmailId)
			throws InvalidAmountException {
				if((minAmount.compareTo(maxAmount))>0){
					throw new InvalidAmountException("Invalid Amount");
				}
				return ssiRespository.findByAmountBetweenAndUserEmailId(minAmount,maxAmount,userEmailId);
	}

	@Override
	public List<SSI> filterSSIByAssetType(String assetType, String userEmailId) {
		return ssiRespository.findByAssetType(assetType);
	}

	@Override
	public List<SSI> filterSSIByAssetRange(int minAssetNo, int maxAssetNo, String userEmailId) {
		return ssiRespository.findByNumberOfAsset(minAssetNo,maxAssetNo);
	}

	@Override
	public List<SSI> filterSSIByTransactionType(String transactionType, String userEmailId) {
		return ssiRespository.findByTransactionType(transactionType);
	}

	@Override
	public List<SSI> filterSSIByStatus(String status, String userEmailId) {
		return ssiRespository.findByStatusAndUserEmailId(status,userEmailId);
	}

	@Override
	public List<SSI> displaySSIListByEmailId(String emailId) {
		return ssiRespository.findByUserEmailId(emailId);
	}

}
