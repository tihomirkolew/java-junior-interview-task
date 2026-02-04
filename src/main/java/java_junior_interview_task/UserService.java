package java_junior_interview_task;

import java_junior_interview_task.dto.UserRequest;
import java_junior_interview_task.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // create user

    public User createUser(@RequestBody UserRequest userRequest) {

        User user = User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .phoneNumber(userRequest.getPhoneNumber())
                .email(userRequest.getEmail())
                .build();

        return userRepository.save(user);
    }

    // read one user
    // read all users (search by provided search term)
    // update user
    // delete user
}
