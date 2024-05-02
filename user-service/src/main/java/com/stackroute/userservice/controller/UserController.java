package com.stackroute.userservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "http://localhost:3000")
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
	
	@DeleteMapping("/user/{empId}")
	public ResponseEntity<?> deleteUser(@PathVariable String empId)
	{
		if(userserv.deleteUser(empId))
		{
			return new ResponseEntity<String>("Deleted User",HttpStatus.OK);
		}
		return new ResponseEntity<String>("No such user",HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/user/{empId}")
	public ResponseEntity<?> updateUser(@PathVariable String empId,@RequestBody User user)
	{
		if(userserv.updateUser(empId,user))
		{
			return new ResponseEntity<String>("Updated User",HttpStatus.OK);
		}
		return new ResponseEntity<String>("No such user",HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/user")
	public ResponseEntity<?> updateUser(@RequestBody User user)
	{
		if(userserv.addUser(user))
		{
			return new ResponseEntity<String>("Added User",HttpStatus.OK);
		}
		return new ResponseEntity<String>("No such user",HttpStatus.NOT_FOUND);
	}

	@GetMapping("/user/filter/byEmpId/{empIds}")
	public ResponseEntity<?> filterByEmpIds(@PathVariable String empIds)
	{
		String empIdArr[]=empIds.split("&");
		return new ResponseEntity<List<User>>(userserv.filterByEmpId(empIdArr),HttpStatus.OK);
	}
	
	@GetMapping("/user/filter/byEmailId/{emailIds}")
	public ResponseEntity<?> filterByEmailIds(@PathVariable String emailIds)
	{
		String emailIdArr[]=emailIds.split("&");
		return new ResponseEntity<List<User>>(userserv.filterByEmailId(emailIdArr),HttpStatus.OK);
	}

	@GetMapping("/user/filter/byRole/{role}")
	public ResponseEntity<?> filterByRole(@PathVariable String role)
	{
		return new ResponseEntity<List<User>>(userserv.filterByRole(role),HttpStatus.OK);
	}

}
