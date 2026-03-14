package java_junior_interview_task.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java_junior_interview_task.user.service.UserService;
import java_junior_interview_task.user.dto.UserRequestDto;
import java_junior_interview_task.user.dto.UserResponseDto;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    @Operation(summary = "Create user")
    public ResponseEntity<UserRequestDto> createUser(@Valid @RequestBody UserRequestDto userDto) {

        UserRequestDto createdUser = userService.createUser(userDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single user")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable int id) {

        UserResponseDto getUserById = userService.getUser(id);

        return ResponseEntity.ok(getUserById);
    }

    @GetMapping("/search")
    @Operation(summary = "Get users with provided term")
    public ResponseEntity<Page<UserResponseDto>> getUsersByTerm(
            @RequestParam String term,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Page<UserResponseDto> userListByTerm = userService.getUsersByTerm(term, page, size);

        return ResponseEntity.ok(userListByTerm);
    }

    @GetMapping
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {

        List<UserResponseDto> userList = userService.getAllUsers();

        return ResponseEntity.ok(userList);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update user")
    public ResponseEntity<UserRequestDto> updateUser(@PathVariable int id, @Valid @RequestBody UserRequestDto userDto) {

        UserRequestDto updatedUser = userService.updateUserInfo(id, userDto);

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

}
