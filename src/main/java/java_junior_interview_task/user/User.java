package java_junior_interview_task.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @NotBlank(message = "You must enter a phone number.")
    @Pattern(regexp = "^\\+?[0-9]*$", message = "You must enter a valid phone number.")
    @Column(nullable = false, unique = true)
    @Length(min = 7, max = 15)
    private String phoneNumber;

    @NotBlank(message = "You must enter an email address.")
    @Email(message = "You must enter a valid email.")
    @Column(nullable = false, unique = true)
    private String email;

}
