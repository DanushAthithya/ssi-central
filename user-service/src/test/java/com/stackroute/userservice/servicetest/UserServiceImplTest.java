package com.stackroute.userservice.servicetest;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;

import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
import com.stackroute.userservice.service.UserServiceImpl;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    
    @Mock
    private JavaMailSender emailSender;
    
    @InjectMocks
    private UserServiceImpl userService;

    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Initialize mock data
        mockUser = new User("u65", "test@example.com", "password", null, null);
        mockUser.setPassword("hashedPassword"); // Assuming hashed password for testing
    }

    @AfterEach
    void tearDown() {
        // Clean up mock data
        mockUser = null;
    }
   @Test
    void testGetUser_ValidEmpId_ReturnsUser() {
        // Mock repository behavior
        when(userRepository.existsById("u65")).thenReturn(true);
        when(userRepository.findById("u65")).thenReturn(Optional.of(mockUser));

        assertEquals(Optional.of(mockUser), userService.getUser("u65"));
    }

    @Test
    void testGetUser_InvalidEmpId_ReturnsEmptyOptional() {
        // Mock repository behavior
        when(userRepository.existsById("u66")).thenReturn(false);

        assertEquals(Optional.empty(), userService.getUser("u66"));
    }
    @Test
    void testFilterByEmpId_ValidEmpIds_ReturnsFilteredUsers() {
        // Mock repository behavior
        when(userRepository.existsById(anyString())).thenReturn(true);
        when(userRepository.findById("1")).thenReturn(Optional.of(new User("1", "test1@example.com", "password", "Role1", null)));
        when(userRepository.findById("2")).thenReturn(Optional.of(new User("2", "test2@example.com", "password", "Role2", null)));
        
        String[] empIds = {"1", "2"};
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(new User("1", "test1@example.com", "password", "Role1", null));
        expectedUsers.add(new User("2", "test2@example.com", "password", "Role2", null));

        assertEquals(expectedUsers, userService.filterByEmpId(empIds));
    }

    @Test
    void testFilterByEmailId_ValidEmailIds_ReturnsFilteredUsers() {
        // Mock repository behavior
        when(userRepository.findByEmailId(anyString())).thenReturn(new ArrayList<>());
        when(userRepository.findByEmailId("test1@example.com")).thenReturn(List.of(new User("1", "test1@example.com", "password", "Role1", null)));
        when(userRepository.findByEmailId("test2@example.com")).thenReturn(List.of(new User("2", "test2@example.com", "password", "Role2", null)));
        
        String[] emailIds = {"test1@example.com"};
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(new User("1", "test1@example.com", "password", "Role1", null));
        // expectedUsers.add(new User("2", "test2@example.com", "password", "Role2",null));

        assertEquals(expectedUsers, userService.filterByEmailId(emailIds));
    }

    @Test
    void testFilterByRole_ValidRole_ReturnsFilteredUsers() {
        // Mock repository behavior
        when(userRepository.findByRole(anyString())).thenReturn(List.of(new User("1", "test1@example.com", "password", "Role1", null)));
        
        List<User> expectedUsers = new ArrayList<>();
        expectedUsers.add(new User("1", "test1@example.com", "password", "Role1", null));

        assertEquals(expectedUsers, userService.filterByRole("Role1"));
    }

    // Add more test cases for other methods
}
