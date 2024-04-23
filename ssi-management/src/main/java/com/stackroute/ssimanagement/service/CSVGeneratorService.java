package com.stackroute.ssimanagement.service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import com.stackroute.ssimanagement.model.SSI;
import com.stackroute.ssimanagement.repository.SSIRepository;

@Service
public class CSVGeneratorService {

    @Autowired
    private SSIRepository ssirepo;

    public byte[] generateCSV(String[] instructionIds) throws IOException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
             CsvBeanWriter csvWriter = new CsvBeanWriter(new OutputStreamWriter(outputStream),
                     CsvPreference.STANDARD_PREFERENCE)) {

            // Define CSV Header
            String[] csvHeader = {"instructionId", "counterPartyAccountNumber", "counterPartyName",
                    "counterPartyEmail", "swiftCode", "transactionType", "status", "assetDetails",
                    "assetType", "numberOfAsset", "createdDate", "deadlineDate", "amountCurrencyType",
                    "denomination", "amount", "intermediaryAccountNumber", "beneficiaryAccountNumber",
                    "beneficiaryAccountName", "reference", "userId", "userEmailId"};
            csvWriter.writeHeader(csvHeader);

            // Write SSI Data to CSV
            for (String instructionId : instructionIds) {
                Optional<SSI> ssi = ssirepo.findById(Integer.parseInt(instructionId));
                ssi.ifPresent(value -> {
                    try {
                        csvWriter.write(value, csvHeader);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
            }
            csvWriter.flush();
            return outputStream.toByteArray();
        }
    }
}
