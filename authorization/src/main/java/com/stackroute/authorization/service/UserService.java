package com.stackroute.authorization.service;

import com.stackroute.authorization.exception.InvalidEmailId;
import com.stackroute.authorization.model.User;

public interface UserService{
    public boolean validateUser(User user) throws InvalidEmailId;
    public User getUserByEmailId(String emailId) throws InvalidEmailId;
    public String encryptPassword(String password);
    public void sendOtpMail(String emailId,String otp);
    public String otpGenerator();
    public boolean forgetPassword(String emailId) throws InvalidEmailId;
    public boolean otpVerifier(String emailId,String otp);
    public void updatePassword(String emailId,String password) throws InvalidEmailId;
}

