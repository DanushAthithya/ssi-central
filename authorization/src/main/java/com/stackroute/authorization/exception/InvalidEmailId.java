package com.stackroute.authorization.exception;

public class InvalidEmailId extends Exception {
    public InvalidEmailId(){

    }
    public InvalidEmailId(String msg){
        super(msg);
    }
}
