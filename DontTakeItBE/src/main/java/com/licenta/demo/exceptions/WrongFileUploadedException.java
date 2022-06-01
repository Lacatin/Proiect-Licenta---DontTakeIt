package com.licenta.demo.exceptions;

public class WrongFileUploadedException extends RuntimeException{
    public WrongFileUploadedException(String message) {
        super(message);
    }
}
