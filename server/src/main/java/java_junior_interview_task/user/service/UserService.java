package java_junior_interview_task.user.service;

import jakarta.transaction.Transactional;
import java_junior_interview_task.user.dto.UserDto;
import java_junior_interview_task.user.entity.User;
import java_junior_interview_task.user.mapper.UserMapper;
import java_junior_interview_task.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
                .dateOfBirth(userDto.getDateOfBirth())
                .phoneNumber(userDto.getPhoneNumber())
                .email(userDto.getEmail())
                .build();

        User savedUser = userRepository.save(user);

        return UserMapper.toUserDto(savedUser);
    }

    // read one user
    public UserDto getUser(int id) {

        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        return UserMapper.toUserDto(user);
    }

    public List<UserDto> getAllUsers() {

        List<User> userList = userRepository.findAll();

        List<UserDto> userDtoList = new ArrayList<>();

        userList.forEach(user -> userDtoList.add(UserMapper.toUserDto(user)));

        return userDtoList;
    }

    // read all users (search by provided search term)
    public Page<UserDto> getUsersByTerm(String term, int page, int size) {

        Sort sort = Sort.by("lastName").and(Sort.by("dateOfBirth"));
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<User> userPage = userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCaseOrderByLastNameAscDateOfBirthAsc(
                term, term, term, term,
                pageable
        );

        Page<UserDto> userDtoPage = userPage.map(UserMapper::toUserDto);

        return userDtoPage;
    }

    // update user
    @Transactional
    public UserDto updateUserInfo(int id, UserDto userDto) {

        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        userToUpdate.setFirstName(userDto.getFirstName());
        userToUpdate.setLastName(userDto.getLastName());
        userToUpdate.setPhoneNumber(userDto.getPhoneNumber());
        userToUpdate.setEmail(userDto.getEmail());

        User savedUser = userRepository.save(userToUpdate);

        return UserMapper.toUserDto(savedUser);
    }

    // delete user
    @Transactional
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
