package com.stackroute.ssimanagement.exception;

public class InvalidAmountException extends Exception {
    public InvalidAmountException(){}
    public InvalidAmountException(String msg){
        super(msg);
    }
}
