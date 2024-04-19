package com.stackroute.authorization.service;

import com.stackroute.authorization.model.User;

public interface UserService{
    public User validateUser(User user);
    public User getUserByEmailId(String emailId);
}

