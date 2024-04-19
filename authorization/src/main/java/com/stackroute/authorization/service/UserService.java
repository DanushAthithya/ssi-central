package com.stackroute.authorization.service;

import com.stackroute.authorization.model.User;

public interface UserService{
    public boolean validateUser(User user);
    public User getUserByEmailId(String emailId);
    public String encryptPassword(String password);
    public void sendOtpMail(String emailId,String otp);
    public String otpGenerator();
    public boolean forgetPassword(String emailId);
    public boolean otpVerifier(String emailId,String otp);
    public boolean updatePassword(String emailId,String password);
}

