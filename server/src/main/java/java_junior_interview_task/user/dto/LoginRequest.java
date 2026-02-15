package java_junior_interview_task.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequest {

    @NotNull(message = "You must enter an email address.")
    @Email(message = "You must enter a valid email.")
    private String email;

    @NotNull
    private String password;
}