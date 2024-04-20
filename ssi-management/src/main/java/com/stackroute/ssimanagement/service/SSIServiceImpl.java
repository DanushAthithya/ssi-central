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
	public boolean updateSSI(int instructionId, SSI ssi) {
		// TODO Auto-generated method stub
		boolean isUpdated=false;
		Optional<SSI> optional = ssiRespository.findById(instructionId);
		if(optional.isPresent()) {
			SSI ssi1=optional.get();
			ssi.setInstructionId(instructionId);
			ssiRespository.save(ssi);
			isUpdated=true;
		}
		return isUpdated;
	}

	@Override
	public boolean deleteSSI(int instructionId) {
		// TODO Auto-generated method stub
		if (ssiRespository.existsById(instructionId)) {
			ssiRespository.deleteById(instructionId);
			return true;
		}
		return false;
	}

	@Override
	public boolean sendMailSSI(String counterPartyEmail, SSI ssi) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<SSI> filterSSI() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<SSI> checkSSIById(int instructionId) {
		// TODO Auto-generated method stub
		if(ssiRespository.existsById(instructionId))
		{
			return ssiRespository.findById(instructionId);
		}
		return Optional.empty();
	}

}
