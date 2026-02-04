package java_junior_interview_task;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java_junior_interview_task.dto.UserRequest;
import java_junior_interview_task.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @Operation(summary = "Create user")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest userRequest) {

        User createdUser = userService.createUser(userRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // read one user

    // read all users (search by provided search term)

    // update user

    // delete user

}
