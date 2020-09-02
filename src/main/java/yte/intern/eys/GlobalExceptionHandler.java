package yte.intern.eys;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.common.enums.MessageType;
import org.hibernate.exception.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MessageResponse> handleValidationException(MethodArgumentNotValidException e, WebRequest request) {
        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return ResponseEntity.ok(new MessageResponse(message, MessageType.ERROR));
    }

    //this is used when a DB constraint is violated
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<MessageResponse> handleConstraintViolationException(ConstraintViolationException e, WebRequest request) {
        String message = e.getMessage();
        return ResponseEntity.ok(new MessageResponse(message, MessageType.ERROR));
    }

    //this is used when the data that comes in the JSON object is not valid (text instead of number)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<MessageResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException e, WebRequest request) {
        String message = "The data you entered is not valid, please check and try again.";
        return ResponseEntity.ok(new MessageResponse(message, MessageType.ERROR));
    }



}
