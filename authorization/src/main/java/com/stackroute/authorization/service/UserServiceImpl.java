package com.stackroute.authorization.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.authorization.model.User;
import com.stackroute.authorization.repository.UserRepository;
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Override
	public User validateUser(User user) {
		Optional<User> optional =userRepository.findByEmailIdAndPassword(user.getEmailId(), user.getPassword());
		User user1=optional.isPresent()?optional.get():null;
		
		return user1;
	}

	@Override
	public User getUserByEmailId(String emailId) {
		Optional<User> optional =userRepository.findByEmailId(emailId);
		return optional.isPresent()?optional.get():null;
	}



}
