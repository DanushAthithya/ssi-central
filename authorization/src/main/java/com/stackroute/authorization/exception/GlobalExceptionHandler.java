package com.stackroute.authorization.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
	public class GlobalExceptionHandler {
		@ExceptionHandler(InvalidEmailId.class)
		public ResponseEntity<?> exceptionHandlerInvalidEmailId(InvalidEmailId exception){
			ResponseEntity<?> entity= new ResponseEntity<String>(exception.getMessage(),HttpStatus.CONFLICT);
			return entity;
		}
}
