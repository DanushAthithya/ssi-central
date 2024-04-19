package com.stackroute.userservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserServiceImpl;

@RestController
@RequestMapping("/api/v1")
public class UserController {
	
	@Autowired
	private UserServiceImpl userserv;
	
	@GetMapping("/user")
	public ResponseEntity<?> displayList()
	{
		return new ResponseEntity<List<User>>(userserv.displayList(),HttpStatus.OK);
	}
	
	@GetMapping("/user/{empId}")
	public ResponseEntity<?> displayUser(@PathVariable String empId)
	{
		Optional<User> user=userserv.getUser(empId);
		if(user.isPresent())
		{
			return new ResponseEntity<User>(user.get(),HttpStatus.OK);
		}
		return new ResponseEntity<String>("No such user",HttpStatus.NOT_FOUND);
	}
	

}
