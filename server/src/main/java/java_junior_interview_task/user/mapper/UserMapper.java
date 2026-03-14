package java_junior_interview_task.user.mapper;

import java_junior_interview_task.user.dto.UserRequestDto;
import java_junior_interview_task.user.dto.UserResponseDto;
import java_junior_interview_task.user.entity.User;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserMapper {

    public UserRequestDto toUserRequestDto(User user) {

        return new UserRequestDto(
                user.getFirstName(),
                user.getLastName(),
                user.getDateOfBirth(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getPassword()
        );
    }

    public UserResponseDto toUserResponseDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getDateOfBirth(),
                user.getPhoneNumber(),
                user.getEmail()
        );
    }
}
