package com.stackroute.authorization.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.authorization.exception.InvalidEmailId;
import com.stackroute.authorization.model.User;
import com.stackroute.authorization.service.UserService;

import io.jsonwebtoken.Jwts;

@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
	private UserService userService;
	
    @PostMapping("/login")
	public ResponseEntity<?> validateUser(@RequestBody User user) throws InvalidEmailId{
		ResponseEntity<?> entity= new ResponseEntity<String>("Invalid Username/ Password",HttpStatus.NOT_FOUND);
		if(userService.validateUser(user))
		{
			String token= getToken(user.getEmailId());
			entity=new ResponseEntity<String>(token,HttpStatus.OK);
		}
		return entity;
	}

	@PostMapping("/forgetPassword/{emailId}")                                    //it is just used to verify if emailId belongs to a user and sends otp to email
	public ResponseEntity<?> forgetPassword(@PathVariable String emailId) throws InvalidEmailId
	{
		if(userService.forgetPassword(emailId))
		{
			return new ResponseEntity<String>("Check your email for otp",HttpStatus.OK);
		}
		else{
			return new ResponseEntity<String>("Invalid Email ID",HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/otpVerify/{otp}")                                          //verifies the otp sent to email
	public ResponseEntity<?> otpVerify(@RequestBody String emailId,@PathVariable String otp) {
		if(userService.otpVerifier(emailId, otp))
		{
			return new ResponseEntity<String>("Valid OTP",HttpStatus.OK);
		}
		else{
			return new ResponseEntity<String>("Invalid OTP",HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@PutMapping("/updatePassword/{password}")                                     //updates the password
	public ResponseEntity<?> updatePassword(@PathVariable String password,@RequestBody String emailId) throws InvalidEmailId {
		userService.updatePassword(emailId, password);
		return new ResponseEntity<String>("Updated Password",HttpStatus.OK);
	}


    private String getToken(String emailId) {
		return Jwts.builder().setSubject(emailId).setIssuedAt(new Date()).signWith(io.jsonwebtoken.SignatureAlgorithm.HS256,"BATON-SUCCESS").compact();
	}
	

}
