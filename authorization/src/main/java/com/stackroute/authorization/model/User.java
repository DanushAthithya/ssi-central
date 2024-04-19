package com.stackroute.authorization.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
	@Id
	private String empId;
	
	@Column(nullable = false)
	private String emailId;
	
	@Column(nullable = false,length = 64)          //Password is stored as hash which is 64 char length
	private String password;
	
	@Column(nullable = false)
	private String userName;
	 
	@Column(nullable = false)
	private String role;
}
