package com.stackroute.ssimanagement.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.stackroute.ssimanagement.model.SSI;


public interface SSIService {
	public SSI addSSI(SSI ssi);
	public List<SSI> displaySSIList();
	public boolean updateSSI(SSI ssi);
	public boolean deleteSSI(int instructionId);
	public void sendMailSSI(String counterPartyEmail,SSI ssi);	//To send notification mail to the counterparty about the deadline of transacrtion
	public void sendDeadlineNotification(String counterPartyEmail,String userEMailId,String htmlBody);
	public Optional<SSI> checkSSIById(int instructionId);
	public List<SSI> filterSSIByDate(Date startDate, Date endDate);
	public List<SSI> filterSSIByCounterPartyName(String counterPartyName);
	public List<SSI> filterSSIByAmount(BigDecimal minAmount, BigDecimal maxAmount);
}
