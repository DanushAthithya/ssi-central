package com.stackroute.authorization.service;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;

import com.stackroute.authorization.exception.InvalidEmailId;
import com.stackroute.authorization.model.User;
import com.stackroute.authorization.repository.UserRepository;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    
    @Mock
    private JavaMailSender emailSender;
    
    @InjectMocks
    private UserServiceImpl userService;

    private User mockUser;
    private User mockUser2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

    // Initialize mock users with different email addresses and passwords
        mockUser = new User("u65", "test@example.com", "password1", null, null);
        mockUser.setPassword("hashedPassword1"); // Assuming hashed password for testing

    // Additional mock users
        mockUser2 = new User("u66", "user2@example.com", "", null, null);
        mockUser2.setPassword("hashedPassword2");

    }

    @AfterEach
    void tearDown() {
    // Clean up mock data
        mockUser = null;
        mockUser2 = null;

    }

    // @Test
    // void testValidateUser_ValidUser_ReturnsTrue() throws InvalidEmailId {
    // // Mock repository behavior for a valid user
    //     when(userRepository.findByEmailIdAndPassword(mockUser.getEmailId(), mockUser.getPassword())).thenReturn(Optional.of(mockUser));

    //     assertTrue(userService.validateUser(mockUser));
    // }

    // @Test
    // void testValidateUser_InvalidUser_ReturnsFalse() throws InvalidEmailId {
    // // Mock repository behavior for an invalid user
    //    when(userRepository.findByEmailIdAndPassword(mockUser2.getEmailId(), mockUser2.getPassword())).thenReturn(Optional.empty());

    //    assertFalse(userService.validateUser(mockUser2));
    // }

    @Test
    void testValidateUser_InvalidEmailId_ThrowsException() {
        // Mock repository behavior
        when(userRepository.findByEmailId(mockUser.getEmailId())).thenReturn(Optional.empty());

        assertThrows(InvalidEmailId.class, () -> userService.validateUser(mockUser));
    }

    @Test
    void testGetUserByEmailId_ValidEmailId_ReturnsUser() throws InvalidEmailId {
        // Mock repository behavior
        when(userRepository.findByEmailId(mockUser.getEmailId())).thenReturn(Optional.of(mockUser));

        assertEquals(mockUser, userService.getUserByEmailId(mockUser.getEmailId()));
    }

    @Test
    void testGetUserByEmailId_InvalidEmailId_ThrowsException() {
        // Mock repository behavior
        when(userRepository.findByEmailId(mockUser.getEmailId())).thenReturn(Optional.empty());

        assertThrows(InvalidEmailId.class, () -> userService.getUserByEmailId(mockUser.getEmailId()));
    }

    // Add more test cases for other methods as per your requirements
}
