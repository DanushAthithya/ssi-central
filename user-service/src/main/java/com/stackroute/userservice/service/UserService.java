package com.stackroute.userservice.service;

import com.stackroute.userservice.model.User;

public interface UserService {
	public boolean addUser(User user);
	public String passwordGenerator();
	public boolean updateUser(String empId,User user);
	public boolean deleteUser(String empId);
	public boolean sendMail(String emailId,String password);
	public String encryptPassword(String password);
}

