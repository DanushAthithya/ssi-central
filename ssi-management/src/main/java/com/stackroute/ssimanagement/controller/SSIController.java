package com.stackroute.ssimanagement.controller;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.ssimanagement.model.SSI;
import com.stackroute.ssimanagement.service.SSIService;

@RestController
@RequestMapping("api/v1/ssi")
public class SSIController {
    @Autowired
    private SSIService ssiService;

    @PostMapping("/add/")
    public ResponseEntity<?> addSSI(@RequestBody SSI ssi) {
        SSI newSSI = ssiService.addSSI(ssi);
        ResponseEntity<SSI> entity = new ResponseEntity<SSI>(newSSI, HttpStatus.CREATED);
        return entity;
    }

    @GetMapping("/")
    public ResponseEntity<?> displaySSIList() {
        List<SSI> SSIList = ssiService.displaySSIList();
        ResponseEntity<List<SSI>> entity = new ResponseEntity<List<SSI>>(SSIList, HttpStatus.OK);
        return entity;
    }

    @PutMapping("/update/{instructionId}")
	public ResponseEntity<String> updateSSI(@PathVariable int instructionId,@RequestBody SSI ssi){
        boolean update = ssiService.updateSSI(ssi);
        if(!update){
            ResponseEntity<String> entity = new ResponseEntity<>("SSI with ID " + instructionId + " not found", HttpStatus.NOT_FOUND);
            return entity;
        }
		else{
            ResponseEntity<String> entity = new ResponseEntity<>("SSI with ID " + instructionId + " updated successfully", HttpStatus.OK);
            return entity;
        }
	}

    @DeleteMapping("/delete/{instructionId}")
	public ResponseEntity<?> deleteSSI(@PathVariable int instructionId){
            ssiService.deleteSSI(instructionId);
            ResponseEntity<?> entity = new ResponseEntity<>("SSI with ID " + instructionId + " updated successfully", HttpStatus.OK);
            return entity;
	}

    @GetMapping("/check/instructionId")
    public ResponseEntity<?> checkSSIById(@PathVariable int instructionId) {
        Optional<SSI> ssi = ssiService.checkSSIById(instructionId);
        ResponseEntity<?> entity = new ResponseEntity<String>("Invalid SSI ID", HttpStatus.NOT_FOUND);
        if (ssi.isPresent())
            entity = new ResponseEntity<SSI>(ssi.get(), HttpStatus.CREATED);
        return entity;
    }

    @GetMapping("/filter/byDateRange/{startDate}/{endDate}")
    public ResponseEntity<?> filterSSIByDateRange(@PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate, @PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate) {
    List<SSI> ssiList = ssiService.filterSSIByDate(startDate, endDate);
    ResponseEntity<?> entity;
    if (!ssiList.isEmpty()) {
        entity = new ResponseEntity<>(ssiList, HttpStatus.OK);
    } else {
        entity = new ResponseEntity<>("No SSIs found between the given dates", HttpStatus.NOT_FOUND);
    }
    return entity;
}

    @GetMapping("/filter/byAmountRange/{minAmount}/{maxAmount}")
    public ResponseEntity<?> filterSSIByAmountRange(@PathVariable BigDecimal minAmount, @PathVariable BigDecimal maxAmount) {
    List<SSI> ssiList = ssiService.filterSSIByAmount(minAmount, maxAmount);
    ResponseEntity<?> entity;
    if (!ssiList.isEmpty()) {
        entity = new ResponseEntity<>(ssiList, HttpStatus.OK);
    } else {
        entity = new ResponseEntity<>("No SSIs found between the given amount range", HttpStatus.NOT_FOUND);
    }
    return entity;
}

    @GetMapping("/filter/byCounterParty/{counterPartyName}")
    public ResponseEntity<?> filterSSIByCounterParty(@PathVariable String counterPartyName) {
    List<SSI> ssiList = ssiService.filterSSIByCounterPartyName(counterPartyName);
    ResponseEntity<?> entity;
    if (!ssiList.isEmpty()) {
        entity = new ResponseEntity<>(ssiList, HttpStatus.OK);
    } else {
        entity = new ResponseEntity<>("No SSIs found for the given counterparty name", HttpStatus.NOT_FOUND);
    }
    return entity;
}

}
