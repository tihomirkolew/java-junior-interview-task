package java_junior_interview_task.exception;

public class NoUserFoundByIdException extends RuntimeException {
    public NoUserFoundByIdException(String message) {
        super(message);
    }
}
