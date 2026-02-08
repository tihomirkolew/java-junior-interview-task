package java_junior_interview_task.user.mapper;

import java_junior_interview_task.user.dto.UserDto;
import java_junior_interview_task.user.entity.User;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserMapper {

    public UserDto toUserDto(User user) {

        return new UserDto(
                user.getFirstName(),
                user.getLastName(),
                user.getDateOfBirth(),
                user.getPhoneNumber(),
                user.getEmail()
        );
    }
}
