package java_junior_interview_task.exception;

public class NoUserFoundByEmailException extends RuntimeException {
    public NoUserFoundByEmailException(String message) {
        super(message);
    }
}
