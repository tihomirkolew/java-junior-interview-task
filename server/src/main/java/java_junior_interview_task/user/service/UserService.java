package java_junior_interview_task.user.service;

import jakarta.transaction.Transactional;
import java_junior_interview_task.exception.EmailDuplicateException;
import java_junior_interview_task.exception.NoUserFoundByIdException;
import java_junior_interview_task.exception.PhoneNumberDuplicateException;
import java_junior_interview_task.user.dto.UserEditDto;
import java_junior_interview_task.user.dto.UserRequestDto;
import java_junior_interview_task.user.dto.UserResponseDto;
import java_junior_interview_task.user.entity.User;
import java_junior_interview_task.user.mapper.UserMapper;
import java_junior_interview_task.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // create user

    @Transactional
    public UserRequestDto createUser(UserRequestDto userDto) {

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new EmailDuplicateException("Email already in use.");
        }

        if (userRepository.existsByPhoneNumber(userDto.getPhoneNumber())) {
            throw new PhoneNumberDuplicateException("Phone number already in use.");
        }

        User user = User.builder()
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .dateOfBirth(userDto.getDateOfBirth())
                .phoneNumber(userDto.getPhoneNumber())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();

        User savedUser = userRepository.save(user);

        return UserMapper.toUserRequestDto(savedUser);
    }

    public UserResponseDto getUser(int id) {

        User user = userRepository.findById(id).orElseThrow(() -> new NoUserFoundByIdException("User with id " + id + " not found."));

        return UserMapper.toUserResponseDto(user);
    }

    public List<UserResponseDto> getAllUsers() {

        List<User> userList = userRepository.findAll();

        List<UserResponseDto> userDtoList = new ArrayList<>();

        userList.forEach(user -> userDtoList.add(UserMapper.toUserResponseDto(user)));

        return userDtoList;
    }

    public Page<UserResponseDto> getUsersByTerm(String term, int page, int size) {

        Sort sort = Sort.by("lastName").and(Sort.by("dateOfBirth"));
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<User> userPage = userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCaseOrderByLastNameAscDateOfBirthAsc(
                term, term, term, term,
                pageable
        );

        Page<UserResponseDto> userDtoPage = userPage.map(UserMapper::toUserResponseDto);

        return userDtoPage;
    }

    @Transactional
    public UserEditDto updateUserInfo(int id, UserEditDto userDto) {

        if (userRepository.existsByEmailAndIdNot(userDto.getEmail(), id)) {
            throw new EmailDuplicateException("Email already in use.");
        }

        if (userRepository.existsByPhoneNumberAndIdNot(userDto.getPhoneNumber(), id)) {
            throw new PhoneNumberDuplicateException("Phone number already in use.");
        }

        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        userToUpdate.setFirstName(userDto.getFirstName());
        userToUpdate.setLastName(userDto.getLastName());
        userToUpdate.setPhoneNumber(userDto.getPhoneNumber());
        userToUpdate.setEmail(userDto.getEmail());

        User savedUser = userRepository.save(userToUpdate);

        return UserMapper.toUserEditDto(savedUser);
    }

    // delete user
    @Transactional
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
