package java_junior_interview_task.exception;

public class EmailDuplicateException extends RuntimeException {
    public EmailDuplicateException(String message) {
        super(message);
    }
}
