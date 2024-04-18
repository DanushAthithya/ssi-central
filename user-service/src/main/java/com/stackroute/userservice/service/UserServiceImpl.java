package com.stackroute.userservice.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;

public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userrepo;

	@Override
	public boolean addUser(User user) {
		// TODO Auto-generated method stub
		if(userrepo.existsById(user.getEmpId()))
		{
			return false;
		}
		else {
			String password=this.passwordGenerator();
			user.setPassword(this.encryptPassword(password));
			userrepo.save(user);
			return true;
		}
	}

	@Override
	public String passwordGenerator() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean updateUser(String empId, User user) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteUser(String empId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean sendMail(String emailId, String password) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String encryptPassword(String password) {
		// TODO Auto-generated method stub
		return null;
	}

}
