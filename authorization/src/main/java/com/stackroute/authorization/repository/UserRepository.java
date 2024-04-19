package com.stackroute.authorization.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.authorization.model.User;
@Repository
public interface UserRepository extends JpaRepository<User, String>{
    Optional<User> findByEmailIdAndPassword(String emailId,String password);

    Optional<User> findByEmailId(String emailId);
    

}
