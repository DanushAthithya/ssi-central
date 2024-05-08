package com.stackroute.ssimanagement.servicetest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.stackroute.ssimanagement.exception.InvalidAmountException;
import com.stackroute.ssimanagement.exception.InvalidDateRangeException;
import com.stackroute.ssimanagement.exception.InvalidEmailId;
import com.stackroute.ssimanagement.exception.InvalidSSIId;
import com.stackroute.ssimanagement.model.SSI;
import com.stackroute.ssimanagement.repository.SSIRepository;
import com.stackroute.ssimanagement.service.SSIServiceImpl;

class SSIServiceImplTest {

    @Mock
    private SSIRepository ssiRepository;
    
    @InjectMocks
    private SSIServiceImpl ssiService;

    private SSI mockSSI;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Initialize mock data
        mockSSI = new SSI(1, "CPAccNum", "CounterPartyName", "test@example.com", "SwiftCode", "TransactionType", "Status", "AssetDetails", "AssetType", 10, new Date(), new Date(), "CurrencyType", "Denomination", BigDecimal.valueOf(1000), "IntermediaryAccNum", "BeneficiaryAccNum", "BeneficiaryAccName", "Reference", "UserId", "UserEmailId");
   
        // mockSSI = new SSI("test@example.com", new Date(), "CounterParty", BigDecimal.valueOf(1000), "AssetType", 123456, "TransactionType", "Status");
    }

    @AfterEach
    void tearDown() {
        // Clean up mock data
        mockSSI = null;
    }
   
    // @Test
    // void testAddSSI_ValidSSI_ReturnsSSI() throws InvalidEmailId {
    //     // Mock repository behavior
    //     when(ssiRepository.save(mockSSI)).thenReturn(mockSSI);

    //     assertEquals(mockSSI, ssiService.addSSI(mockSSI));
    // }

    @Test
    void testDisplaySSIList_ReturnsListOfSSI() {
        // Mock repository behavior
        when(ssiRepository.findAll()).thenReturn(new ArrayList<>());

        assertEquals(new ArrayList<SSI>(), ssiService.displaySSIList());
    }

    @Test
    void testUpdateSSI_ValidSSI_ReturnsTrue() throws InvalidSSIId {
        // Mock repository behavior
        when(ssiRepository.existsById(mockSSI.getInstructionId())).thenReturn(true);

        assertTrue(ssiService.updateSSI(mockSSI));
    }

    // Add more test cases for other methods
}

