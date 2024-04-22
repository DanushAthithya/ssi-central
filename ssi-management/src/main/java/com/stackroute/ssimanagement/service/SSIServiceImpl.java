package com.stackroute.ssimanagement.service;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

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
	public SSI addSSI(SSI ssi) {
		this.sendMailSSI(ssi.getCounterPartyEmail(), ssi);
		return ssiRespository.save(ssi);
	}

	@Override
	public List<SSI> displaySSIList() {
		List<SSI> ssiList=ssiRespository.findAll();
		return ssiList;
	}

	@Override
	public boolean updateSSI(SSI ssi) {
		if(ssiRespository.existsById(ssi.getInstructionId()))
		{
			ssiRespository.save(ssi);
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteSSI(int instructionId) {
		if (ssiRespository.existsById(instructionId)) {
			ssiRespository.deleteById(instructionId);
			return true;
		}
		return false;
	}

	@Override
	public void sendMailSSI(String counterPartyEmail, SSI ssi) {
		String subject="Generated SSI";
		String htmlBody = "<html>" +
		"<head>" +
		"<style>" +
		"table {" +
		"  font-family: Arial, sans-serif;" +
		"  border-collapse: collapse;" +
		"  width: 100%;" +
		"}" +
		"td, th {" +
		"  border: 1px solid #dddddd;" +
		"  text-align: left;" +
		"  padding: 8px;" +
		"}" +
		"tr:nth-child(even) {" +
		"  background-color: #dddddd;" +
		"}" +
		"</style>" +
		"</head>" +
		"<body>" +
		"<h2>SSI Details</h2>" +
		"<table>" +
		"<tr><td>Instruction ID:</td><td>" + ssi.getInstructionId() + "</td></tr>" +
		"<tr><td>Counterparty Account Number:</td><td>" + ssi.getCounterPartyAccountNumber() + "</td></tr>" +
		"<tr><td>Counterparty Name:</td><td>" + ssi.getCounterPartyName() + "</td></tr>" +
		"<tr><td>Counterparty Email:</td><td>" + ssi.getCounterPartyEmail() + "</td></tr>" +
		"<tr><td>SWIFT Code:</td><td>" + ssi.getSwiftCode() + "</td></tr>" +
		"<tr><td>Transaction Type:</td><td>" + ssi.getTransactionType() + "</td></tr>" +
		"<tr><td>Status:</td><td>" + ssi.getStatus() + "</td></tr>" +
		"<tr><td>Asset Details:</td><td>" + ssi.getAssetDetails() + "</td></tr>" +
		"<tr><td>Asset Type:</td><td>" + ssi.getAssetType() + "</td></tr>" +
		"<tr><td>Number of Assets:</td><td>" + ssi.getNumberOfAsset() + "</td></tr>" +
		"<tr><td>Created Date:</td><td>" + ssi.getCreatedDate() + "</td></tr>" +
		"<tr><td>Deadline Date:</td><td>" + ssi.getDeadlineDate() + "</td></tr>" +
		"<tr><td>Amount Currency Type:</td><td>" + ssi.getAmountCurrencyType() + "</td></tr>" +
		"<tr><td>Denomination:</td><td>" + ssi.getDenomination() + "</td></tr>" +
		"<tr><td>Amount:</td><td>" + ssi.getAmount() + "</td></tr>" +
		"<tr><td>Intermediary Account Number:</td><td>" + ssi.getIntermediaryAccountNumber() + "</td></tr>" +
		"<tr><td>Beneficiary Account Number:</td><td>" + ssi.getBeneficiaryAccountNumber() + "</td></tr>" +
		"<tr><td>Beneficiary Account Name:</td><td>" + ssi.getBeneficiaryAccountName() + "</td></tr>" +
		"<tr><td>User ID:</td><td>" + ssi.getUserId() + "</td></tr>" +
		"<tr><td>User EmailID:</td><td>" + ssi.getUserEmailId() + "</td></tr>" +
		"<tr><td>Reference:</td><td>" + ssi.getReference() + "</td></tr>" +
		"</table>" +
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
        }
	}

	@Override
	public List<SSI> filterSSIByDate(Date startDate, Date endDate) {
		return ssiRespository.filterSSIByDate(startDate, endDate);
	}
	@Override
	public List<SSI> filterSSIByCounterPartyName(String counterPartyName) {
        return ssiRespository.findByCounterPartyNameIgnoreCase(counterPartyName);
	}
	@Override
	public List<SSI> filterSSIByAmount(BigDecimal minAmount, BigDecimal maxAmount) {
		return ssiRespository.findByAmountBetween(minAmount,maxAmount);
	}

	@Override
	public Optional<SSI> checkSSIById(int instructionId) {
		if(ssiRespository.existsById(instructionId))
		{
			return ssiRespository.findById(instructionId);
		}
		return Optional.empty();
	}

	@Override
	public void sendDeadlineNotification(String counterPartyEmail,String userEmailId,String htmlBody) {
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

}
