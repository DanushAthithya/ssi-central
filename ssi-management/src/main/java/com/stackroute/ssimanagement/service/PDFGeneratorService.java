package com.stackroute.ssimanagement.service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.ssimanagement.model.SSI;
import com.stackroute.ssimanagement.repository.SSIRepository;

@Service
public class PDFGeneratorService {

    @Autowired
    private SSIRepository ssirepo;

    public byte[] generatePDF(String[] instructionIds) throws IOException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
             PDDocument document = new PDDocument()) {

            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                contentStream.beginText();
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("SSI Data");
                contentStream.endText();

                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA, 10);

                // Write SSI Data to PDF
                int yPosition = 680;
                for (String instructionId : instructionIds) {
                    Optional<SSI> ssi = ssirepo.findById(Integer.parseInt(instructionId));
                    if (ssi.isPresent()) {
                        SSI ssiData = ssi.get();
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Instruction ID: " + ssiData.getInstructionId());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Counter Party Account Number: " + ssiData.getCounterPartyAccountNumber());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Counter Party Name: " + ssiData.getCounterPartyName());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Counter Party Email: " + ssiData.getCounterPartyEmail());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Swift Code: " + ssiData.getSwiftCode());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Transaction Type: " + ssiData.getTransactionType());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Status: " + ssiData.getStatus());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Asset Details: " + ssiData.getAssetDetails());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Asset Type: " + ssiData.getAssetType());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Number of Asset: " + ssiData.getNumberOfAsset());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Created Date: " + ssiData.getCreatedDate());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Deadline Date: " + ssiData.getDeadlineDate());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Amount Currency Type: " + ssiData.getAmountCurrencyType());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Denomination: " + ssiData.getDenomination());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Amount: " + ssiData.getAmount());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Intermediary Account Number: " + ssiData.getIntermediaryAccountNumber());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Beneficiary Account Number: " + ssiData.getBeneficiaryAccountNumber());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Beneficiary Account Name: " + ssiData.getBeneficiaryAccountName());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("Reference: " + ssiData.getReference());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("User ID: " + ssiData.getUserId());
                        contentStream.newLineAtOffset(0, -20);
                        contentStream.showText("User Email ID: " + ssiData.getUserEmailId());

                        yPosition -= 380;
                    }
                }

                contentStream.endText();
            }
            document.save(outputStream);
            return outputStream.toByteArray();
        }
    }
}
