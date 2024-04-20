package com.stackroute.authorization.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.authorization.model.User;
import com.stackroute.authorization.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


import io.jsonwebtoken.Jwts;

@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
	private UserService userService;
	
	// @GetMapping("/")
	// public ResponseEntity<?> getAllUser() {
    //     ResponseEntity<?> entity=new ResponseEntity<String>("Welcome", HttpStatus.OK);
	// 	return entity;
	// }
    @PostMapping("/login")
	public ResponseEntity<?> validateUser(@RequestBody User user){
		ResponseEntity<String> entity= new ResponseEntity<String>("Invalid Username/ Password",HttpStatus.NOT_FOUND);
		if(userService.validateUser(user))
		{
			String token= getToken(user.getEmailId());
			entity=new ResponseEntity<String>(token,HttpStatus.OK);
		}
		return entity;
	}

	@PostMapping("/forgetPassword/{emailId}")
	public ResponseEntity<?> forgetPassword(@PathVariable String emailId)
	{
		if(userService.forgetPassword(emailId))
		{
			return new ResponseEntity<String>("Check your email for otp",HttpStatus.OK);
		}
		else{
			return new ResponseEntity<String>("Invalid Email ID",HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/otpVerify/{otp}")
	public ResponseEntity<?> otpVerify(@RequestBody String emailId,@PathVariable String otp) {
		if(userService.otpVerifier(emailId, otp))
		{
			return new ResponseEntity<String>("Valid OTP",HttpStatus.OK);
		}
		else{
			return new ResponseEntity<String>("Invalid OTP",HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@PutMapping("/updatePassword/{password}")
	public ResponseEntity<?> updatePassword(@PathVariable String password,@RequestBody String emailId) {
		userService.updatePassword(emailId, password);
		return new ResponseEntity<String>("Updated Password",HttpStatus.OK);
	}
	
	 
	// @GetMapping("/{emailId}")
	// public ResponseEntity<?> getUserByEmail(@PathVariable String emailId) {
	// 	User user= userService.getUserByEmailId(emailId);
	// 	ResponseEntity<String> entity= new ResponseEntity<String>("Invalid EmailId : "+emailId,HttpStatus.NOT_FOUND);
	// 	if(user!=null) {
	// 			entity=new ResponseEntity<String>("User : "+emailId,HttpStatus.OK);
				
	// 		}
	// 	return entity;
	// }
	// @PutMapping("/user/{empId}")
	// public ResponseEntity<?> updateUser(@PathVariable String empId,@RequestBody User user)
	// {
	// 	// if(userService.updateUser(empId,user))
	// 	// {
	// 	// 	return new ResponseEntity<String>("Updated User",HttpStatus.OK);
	// 	// }
	// 	return new ResponseEntity<String>("No such user",HttpStatus.NOT_FOUND);
	// }


    private String getToken(String emailId) {
		return Jwts.builder().setSubject(emailId).setIssuedAt(new Date()).signWith(io.jsonwebtoken.SignatureAlgorithm.HS256,"BATON-SUCCESS").compact();
	}
	

}
