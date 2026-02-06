package java_junior_interview_task.user.service;

import jakarta.transaction.Transactional;
import java_junior_interview_task.user.dto.UserDto;
import java_junior_interview_task.user.entity.User;
import java_junior_interview_task.user.mapper.UserMapper;
import java_junior_interview_task.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public UserDto getUserDto(int id) {

        User byId = userRepository.getById(id);

        return UserMapper.toUserDto(byId);
    }

    public List<UserDto> getUserByTerm(String term) {

        List<UserDto> listUserDtoByTerm = new ArrayList<>();

        List<User> listByTerm = userRepository.
                findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCase(term, term, term, term);

        listByTerm.forEach(
                user -> listUserDtoByTerm.add(UserMapper.toUserDto(user))
        );

        return listUserDtoByTerm;
    }

    // read all users (search by provided search term)
    // update user
    // delete user
}
