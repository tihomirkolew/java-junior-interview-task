package java_junior_interview_task.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(PhoneNumberDuplicateException.class)
    public ResponseEntity<Map<String, String>> handleDuplicatePhone(PhoneNumberDuplicateException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("phoneNumber", ex.getMessage());
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(EmailDuplicateException.class)
    public ResponseEntity<Map<String, String>> handleDuplicateEmail(EmailDuplicateException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("email", ex.getMessage());
        return ResponseEntity.badRequest().body(errors);
    }
}
