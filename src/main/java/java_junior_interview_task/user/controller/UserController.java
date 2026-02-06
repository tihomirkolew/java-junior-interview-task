package java_junior_interview_task.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java_junior_interview_task.user.service.UserService;
import java_junior_interview_task.user.dto.UserDto;
import java_junior_interview_task.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {

        UserDto createdUser = userService.createUser(userDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // read one user - only info for one user is returned based on an identifier
//    public ResponseEntity<User> getUserById(@RequestParam UUID id) {
//
//    }

    // read all users (search by provided search term)

    // update user

    // delete user

}
