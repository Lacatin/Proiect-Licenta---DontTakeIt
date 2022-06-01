package com.licenta.demo.exceptions.handler;

import com.licenta.demo.exceptions.NotFoundException;
import com.licenta.demo.exceptions.WrongFileUploadedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GenericEntityExceptionHandler {

    @ExceptionHandler(value = {NotFoundException.class})
    public ResponseEntity<GenericEntityErrorResponse> handleEntityNotFound(
            RuntimeException e) {

        GenericEntityErrorResponse error = getGenericEntityErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());

        log.info(e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {WrongFileUploadedException.class})
    public ResponseEntity<GenericEntityErrorResponse> handleEntityWrongFileUploaded(
            RuntimeException e) {

        GenericEntityErrorResponse error = getGenericEntityErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());

        log.info(e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    private GenericEntityErrorResponse getGenericEntityErrorResponse(HttpStatus badRequest, String message) {
        GenericEntityErrorResponse error = new GenericEntityErrorResponse();
        error.setStatus(badRequest.value());
        error.setMessage(message);
        error.setTimestamp(System.currentTimeMillis());
        return error;
    }
}
