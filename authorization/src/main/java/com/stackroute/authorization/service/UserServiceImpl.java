package com.stackroute.authorization.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;



import com.stackroute.authorization.model.User;
import com.stackroute.authorization.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
	@Autowired
    private JavaMailSender emailSender;

    @Override
	public boolean validateUser(User user) {
		user.setPassword(this.encryptPassword(user.getPassword()));
		Optional<User> optional =userRepository.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());
		return optional.isPresent()?true:false;
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

	@Override
	public void sendOtpMail(String email, String otp) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'sendOtpMail'");
	}

	@Override
	public String otpGenerator() {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'otpGenerator'");
	}

	@Override
	public boolean forgetPassword(String emailId) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'forgetPassword'");
	}

	@Override
	public boolean otpVerifier(String emailId, String otp) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'otpVerifier'");
	}

	@Override
	public boolean updatePassword(String emailId, String password) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'updatePassword'");
	}



}
