package com.stackroute.userservice.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
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
		if (userrepo.existsById(empId)) {
			userrepo.deleteById(empId);
			return true;
		}
		return false;
	}

	@Override
	public void sendMail(String emailId, String password) {
		// TODO Auto-generated method stub
		String subject="Login Credentials";
		String htmlBody = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Email Template</title><style>body {font-family: Arial, sans-serif; background-color: white; margin: 0; padding: 20px;} .container {background-color: #ffffff; width: 600px; margin: 20px auto 0 auto; padding: 20px; box-shadow: 0 0 10px rgba(10,0,0,10); border-top: 8px solid #3498db;} h1 {font-size: 24px; color: #333; text-align: center;} .otp-container {background: linear-gradient(145deg, #3498db, #9b59b6); margin: 20px 0; padding: 10px; font-size: 20px; text-align: center; color: white; border-radius: 5px;}</style></head><body><div class=\"container\"><h1>Welcome!</h1><p>Your email: "
+ emailId + "</p><p>Your password: " + password + "<br>Change Password at Forgot Password</p></div></body></html>";


		MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());

        try {
            helper.setFrom("danushathithya24@gmail.com");
            helper.setTo(emailId);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
		
	}

	@Override
	public String encryptPassword(String password) {
		// TODO Auto-generated method stub
		try {
			// Create MessageDigest instance for SHA
			MessageDigest md = MessageDigest.getInstance("SHA-256");

			// Add password bytes to digest
			md.update(password.getBytes());

			// Get the hash's bytes
			byte[] bytes = md.digest();

			// Convert bytes to hexadecimal format
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < bytes.length; i++) {
				sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
			}

			// Get complete hashed password in hexadecimal format
			return sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<User> displayList() {
		// TODO Auto-generated method stub
		return userrepo.findAll();
	}

	@Override
	public Optional<User> getUser(String empId) {
		// TODO Auto-generated method stub
		if(userrepo.existsById(empId))
		{
			return userrepo.findById(empId);
		}
		return Optional.empty();
	}

	@Override
	public List<User> filterByEmpId(String[] empIds) {
		List<User> userList=new ArrayList<>();
		for(String empId:empIds)
		{
			if(userrepo.existsById(empId))
			{
				userList.add(userrepo.findById(empId).get());
			}
		}
		return userList;
	}

	@Override
	public List<User> filterByEmailId(String[] emaildIds) {
		List<User> userList=new ArrayList<>();
		for(String emailId:emaildIds)
		{
			if(userrepo.findByEmailId(emailId).size()>0)
			{
				userList.add(userrepo.findByEmailId(emailId).get(0));
			}
		}
		return userList;
	}

	@Override
	public List<User> filterByRole(String role) {
		return userrepo.findByRole(role);
	}

}
