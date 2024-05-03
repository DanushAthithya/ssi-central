package com.stackroute.ssimanagement.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.ssimanagement.exception.InvalidAmountException;
import com.stackroute.ssimanagement.exception.InvalidDateRangeException;
import com.stackroute.ssimanagement.exception.InvalidEmailId;
import com.stackroute.ssimanagement.exception.InvalidSSIId;
import com.stackroute.ssimanagement.model.SSI;
import com.stackroute.ssimanagement.service.CSVGeneratorService;
import com.stackroute.ssimanagement.service.PDFGeneratorService;
import com.stackroute.ssimanagement.service.SSIService;


@RestController
@RequestMapping("api/v1/ssi")
@CrossOrigin(origins = "http://localhost:3000")
public class SSIController {
    @Autowired
    private SSIService ssiService;

    @Autowired
    private CSVGeneratorService csvGeneratorService;

    @Autowired
    private PDFGeneratorService pdfGeneratorService;

    @PostMapping("/add/")
    public ResponseEntity<?> addSSI(@RequestBody SSI ssi) throws InvalidEmailId {
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
	public ResponseEntity<String> updateSSI(@PathVariable int instructionId,@RequestBody SSI ssi) throws InvalidSSIId{
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
	public ResponseEntity<?> deleteSSI(@PathVariable int instructionId) throws InvalidSSIId{
            ssiService.deleteSSI(instructionId);
            ResponseEntity<?> entity = new ResponseEntity<>("SSI with ID " + instructionId + " updated successfully", HttpStatus.OK);
            return entity;
	}

    @GetMapping("/check/{instructionIds}")
    public ResponseEntity<?> checkSSIByIds(@PathVariable String instructionIds) throws InvalidSSIId {
        
        return new ResponseEntity<>(ssiService.checkSSIByIds(instructionIds.split("&")),HttpStatus.OK);
    }

    @GetMapping("/filter/byDateRange/{startDate}/{endDate}")
    public ResponseEntity<?> filterSSIByDateRange(@PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate, @PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate) throws InvalidDateRangeException {
    List<SSI> ssiList = ssiService.filterSSIByDate(startDate, endDate);
    ResponseEntity<?> entity;
    if (!ssiList.isEmpty()) {
        entity = new ResponseEntity<>(ssiList, HttpStatus.OK);
    } else {
        entity = new ResponseEntity<>(ssiList, HttpStatus.OK);
    }
    return entity;
}

    @GetMapping("/filter/byAmountRange/{minAmount}/{maxAmount}")
    public ResponseEntity<?> filterSSIByAmountRange(@PathVariable BigDecimal minAmount, @PathVariable BigDecimal maxAmount) throws InvalidAmountException {
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
    entity = new ResponseEntity<>(ssiList, HttpStatus.OK);
    return entity;
}

    @GetMapping("/filter/byAssetType/{assetType}")
    public ResponseEntity<?> filterSSIByAssetType(@PathVariable String assetType) {
    List<SSI> ssiList = ssiService.filterSSIByAssetType(assetType);
    ResponseEntity<?> entity;
    entity = new ResponseEntity<>(ssiList, HttpStatus.OK);
    return entity;
}

    @GetMapping("/filter/byAssetRange/{minAssetNo}/{maxAssetNo}")
    public ResponseEntity<?> filterSSIByAssetRange(@PathVariable int minAssetNo, @PathVariable int maxAssetNo) {
    List<SSI> ssiList = ssiService.filterSSIByAssetRange(minAssetNo, maxAssetNo);
    ResponseEntity<?> entity;
    if (!ssiList.isEmpty()) {
        entity = new ResponseEntity<>(ssiList, HttpStatus.OK);
    } else {
        entity = new ResponseEntity<>("No SSIs found within the specified asset range", HttpStatus.NOT_FOUND);
    }
    return entity;
}

    @GetMapping("/filter/byTransactionType/{transactionType}")
    public ResponseEntity<?> filterSSIByTransactionType(@PathVariable String transactionType) {
    List<SSI> ssiList = ssiService.filterSSIByTransactionType(transactionType);
    return new ResponseEntity<>(ssiList,HttpStatus.OK);
}

@GetMapping("/filter/byStatus/{status}")
public ResponseEntity<?> filterSSIByStatus(@PathVariable String status) {
List<SSI> ssiList = ssiService.filterSSIByStatus(status);
return new ResponseEntity<>(ssiList,HttpStatus.OK);
}


   
@PostMapping("/generate-pdf")
public ResponseEntity<?> generatePDF(@RequestBody String instructionIds) {
    try {
        byte[] pdfBytes = pdfGeneratorService.generatePDF(instructionIds.split("&"));
        return new ResponseEntity<byte[]>(pdfBytes,HttpStatus.OK);
    } catch (IOException e) {
        e.printStackTrace();
        return new ResponseEntity<>("Failed to generate PDF.".getBytes(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    @PostMapping("/generate-csv")
    public ResponseEntity<?> generateCSV(@RequestBody String instructionIds) {
        try {
            byte[] csvBytes = csvGeneratorService.generateCSV(instructionIds.split("&"));
            return new ResponseEntity<byte[]>(csvBytes,HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to generate CSV.".getBytes(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
