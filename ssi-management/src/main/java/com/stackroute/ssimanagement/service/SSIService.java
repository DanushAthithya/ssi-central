package com.stackroute.ssimanagement.service;

import java.util.List;
import java.util.Optional;

import com.stackroute.ssimanagement.model.SSI;

public interface SSIService {
	public SSI addSSI(SSI ssi);
	public List<SSI> displaySSIList();
	public boolean updateSSI(int instructionId,SSI ssi);
	public boolean deleteSSI(int instructionId);
	public boolean sendMailSSI(String counterPartyEmail,SSI ssi);	//To send notification mail to the counterparty about the deadline of transacrtion
	public List<SSI> filterSSI();
	public Optional<SSI> checkSSIById(int instructionId);
}
