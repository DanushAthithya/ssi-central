package com.stackroute.userservice.service;

import java.util.List;
import java.util.Optional;

import com.stackroute.userservice.model.User;

public interface UserService {
	public boolean addUser(User user);
	public String passwordGenerator();
	public boolean updateUser(String empId,User user);
	public boolean deleteUser(String empId);
	public boolean sendMail(String emailId,String password);
	public String encryptPassword(String password);
	public List<User> displayList();
	public Optional<User> getUser(String empId);
}
