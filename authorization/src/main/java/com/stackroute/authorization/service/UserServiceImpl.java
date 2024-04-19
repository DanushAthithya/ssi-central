package com.stackroute.authorization.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;



import com.stackroute.authorization.model.User;
import com.stackroute.authorization.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


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
	public void sendOtpMail(String emailId, String otp) {
		// TODO Auto-generated method stub
		String subject="Forgot Password Verification";
		String htmlBody = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Email Template</title></head><body><h1>Welcome!</h1><h2>OTP: <div style={background-color:yellow;}>" + otp + "</div></h2></body></html>";
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
	public String otpGenerator() {
		int otpLength = 4;
        
        // Define the range of characters allowed in the OTP
        String numbers = "0123456789";

        // Use StringBuilder to efficiently append characters
        StringBuilder sb = new StringBuilder();

        // Random object to generate random indices
        Random random = new Random();

        // Generate the OTP
        for (int i = 0; i < otpLength; i++) {
            // Generate a random index between 0 and the length of the numbers string
            int index = random.nextInt(numbers.length());

            // Append the character at the random index to the OTP
            sb.append(numbers.charAt(index));
        }

        // Convert StringBuilder to String and return the OTP
        return sb.toString();
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
