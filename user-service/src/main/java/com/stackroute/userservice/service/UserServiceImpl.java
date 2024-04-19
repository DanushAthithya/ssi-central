package com.stackroute.userservice.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userrepo;
	
	@Autowired
    private JavaMailSender emailSender;

	@Override
	public boolean addUser(User user) {
		// TODO Auto-generated method stub
		if (!userrepo.existsById(user.getEmpId())) {
			String password = this.passwordGenerator();
			user.setPassword(this.encryptPassword(password));
			userrepo.save(user);
			this.sendMail(user.getEmailId(), password);
			return true;
		}
		return false;
	}

	@Override
	public String passwordGenerator() {
		// TODO Auto-generated method stub
		String generatedPassword = RandomStringUtils.randomAlphanumeric(10);
		return generatedPassword;
		return null;
	}

	@Override
	public boolean updateUser(String empId, User user) {
		// TODO Auto-generated method stub
		if (userrepo.existsById(empId)) {
			user.setPassword(userrepo.findById(empId).get().getPassword());
			userrepo.save(user);
			return true;
		}
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

	@Override
	public List<User> displayList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<User> getUser(String empId) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

}
