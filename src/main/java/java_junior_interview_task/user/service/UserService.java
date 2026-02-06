package java_junior_interview_task.user.service;

import jakarta.transaction.Transactional;
import java_junior_interview_task.user.dto.UserDto;
import java_junior_interview_task.user.entity.User;
import java_junior_interview_task.user.mapper.UserMapper;
import java_junior_interview_task.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // create user

    @Transactional
    public UserDto createUser(UserDto userDto) {

        User user = User.builder()
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .phoneNumber(userDto.getPhoneNumber())
                .email(userDto.getEmail())
                .build();

        User savedUser = userRepository.save(user);

        return UserMapper.toUserDto(savedUser);
    }

    // read one user
    // read all users (search by provided search term)
    // update user
    // delete user
}
