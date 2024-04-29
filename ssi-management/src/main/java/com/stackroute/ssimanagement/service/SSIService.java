package com.stackroute.ssimanagement.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.stackroute.ssimanagement.exception.InvalidAmountException;
import com.stackroute.ssimanagement.exception.InvalidDateRangeException;
import com.stackroute.ssimanagement.exception.InvalidEmailId;
import com.stackroute.ssimanagement.exception.InvalidSSIId;
import com.stackroute.ssimanagement.model.SSI;


public interface SSIService {
	public SSI addSSI(SSI ssi) throws InvalidEmailId;
	public List<SSI> displaySSIList();
<<<<<<< HEAD
	public boolean updateSSI(SSI ssi);
	public boolean deleteSSI(int instructionId);
	public void sendMailSSI(String counterPartyEmail,SSI ssi);	//To send notification mail to the counterparty about the deadline of transacrtion
	public void sendDeadlineNotification(String counterPartyEmail,String userEMailId,String htmlBody);
	public List<SSI> checkSSIByIds(String instructionIds[]);
	public List<SSI> filterSSIByDate(Date startDate, Date endDate);
=======
	public boolean updateSSI(SSI ssi) throws InvalidSSIId;
	public boolean deleteSSI(int instructionId) throws InvalidSSIId;
	public void sendMailSSI(String counterPartyEmail,SSI ssi) throws InvalidEmailId;	//To send notification mail to the counterparty about the deadline of transacrtion
	public void sendDeadlineNotification(String counterPartyEmail,String userEMailId,String htmlBody) throws InvalidEmailId;
	public Optional<SSI> checkSSIById(int instructionId) throws InvalidSSIId;
	public List<SSI> filterSSIByDate(Date startDate, Date endDate) throws  InvalidDateRangeException;
>>>>>>> 8353ab1563917a03a6c44f81d8f7fc810934b596
	public List<SSI> filterSSIByCounterPartyName(String counterPartyName);
	public List<SSI> filterSSIByAmount(BigDecimal minAmount, BigDecimal maxAmount) throws InvalidAmountException;
	public List<SSI> filterSSIByAssetType(String assetType);
	public List<SSI> filterSSIByAssetRange(int minAssetNo,int maxAssetNo);
	public List<SSI> filterSSIByTransactionType(String transactionType);
	public List<SSI> filterSSIByStatus(String status);
}
