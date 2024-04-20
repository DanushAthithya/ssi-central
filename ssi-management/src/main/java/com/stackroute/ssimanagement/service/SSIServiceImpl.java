package com.stackroute.ssimanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.ssimanagement.model.SSI;
import com.stackroute.ssimanagement.repository.SSIRepository;

@Service
public class SSIServiceImpl implements SSIService{
	
	@Autowired
	private SSIRepository ssiRespository;
	
	@Override
	public SSI addSSI(SSI ssi) {
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
	public boolean sendMailSSI(String counterPartyEmail, SSI ssi) {
		return false;
	}

	@Override
	public List<SSI> filterSSI() {
		return null;
	}

	@Override
	public Optional<SSI> checkSSIById(int instructionId) {
		if(ssiRespository.existsById(instructionId))
		{
			return ssiRespository.findById(instructionId);
		}
		return Optional.empty();
	}

}
