package com.stackroute.userservice.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.userservice.model.User;



@Repository
public interface UserRepository extends JpaRepository<User, String>{
    public List<User> findByEmailId(String emailId);
    public List<User> findByRole(String role);
}
