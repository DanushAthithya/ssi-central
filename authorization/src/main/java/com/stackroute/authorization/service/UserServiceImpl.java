package com.stackroute.authorization.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.authorization.model.User;
import com.stackroute.authorization.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
	// @Autowired
    // private JavaMailSender emailSender;

    @Override
	public User validateUser(User user) {
		user.setPassword(this.encryptPassword(user.getPassword()));
		// System.out.println("Pass "+user.getPassword());
		Optional<User> optional =userRepository.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());
		User user1=optional.isPresent()?optional.get():null;
		
		return user1;
	}

	@Override
	public User getUserByEmailId(String emailId) {
		Optional<User> optional =userRepository.findByEmailId(emailId);
		return optional.isPresent()?optional.get():null;
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



}
