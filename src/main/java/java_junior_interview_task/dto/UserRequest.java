package java_junior_interview_task.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    @Size(min = 1, max = 50)
    private String firstName;

    @Size(min = 1, max = 50)
    private String lastName;

    @NotNull(message = "You must enter a phone number.")
//    @Pattern(regexp = "^\\+?[0-9]*$", message = "You must enter a valid phone number")
    @Length(min = 7, max = 15)
    private String phoneNumber;

    @NotNull(message = "You must enter an email address.")
    @Email(message = "You must enter a valid email.")
    private String email;
}
