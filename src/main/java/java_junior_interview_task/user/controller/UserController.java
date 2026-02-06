package java_junior_interview_task.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java_junior_interview_task.user.service.UserService;
import java_junior_interview_task.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // create user
    @PostMapping
    @Operation(summary = "Create user")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {

        UserDto createdUser = userService.createUser(userDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // read one user - only info for one user is returned based on an identifier
    @GetMapping("/{id}")
    @Operation(summary = "Get a single user")
    public ResponseEntity<UserDto> getUserById(@PathVariable int id) {

        UserDto getUserById = userService.getUser(id);

        return ResponseEntity.ok(getUserById);
    }

    // read all users (search by provided search term)
    @GetMapping("/search")
    @Operation(summary = "Get users with provided term")
    public ResponseEntity<List<UserDto>> getUsersByTerm(@RequestParam String term) {

        List<UserDto> userListByTerm = userService.getUserByTerm(term);

        return ResponseEntity.ok(userListByTerm);
    }

    // update user
    @PutMapping("/{id}")
    @Operation(summary = "Update user")
    public ResponseEntity<UserDto> updateUser(@PathVariable int id, @Valid @RequestBody UserDto userDto) {

        UserDto updatedUser = userService.updateUserInfo(id, userDto);

        return ResponseEntity.ok(updatedUser);
    }

    // delete user
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

}
