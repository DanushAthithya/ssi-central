package com.stackroute.ssimanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
	public class GlobalExceptionHandler {
		@ExceptionHandler(InvalidEmailId.class)
		public ResponseEntity<?> exceptionHandlerInvalidEmaiilId(InvalidEmailId exception){
			ResponseEntity<?> entity= new ResponseEntity<String>(exception.getMessage(),HttpStatus.CONFLICT);
			return entity;
		}
        @ExceptionHandler(InvalidSSIId.class)
		public ResponseEntity<?> exceptionHandlerInvalidSSIId(InvalidSSIId exception){
			ResponseEntity<?> entity= new ResponseEntity<String>(exception.getMessage(),HttpStatus.CONFLICT);
			return entity;
		}
}
