package java_junior_interview_task.user.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}