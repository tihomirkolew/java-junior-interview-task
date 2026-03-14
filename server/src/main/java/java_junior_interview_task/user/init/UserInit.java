package java_junior_interview_task.user.init;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java_junior_interview_task.user.dto.UserRequestDto;
import java_junior_interview_task.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
@Slf4j
public class UserInit implements CommandLineRunner {

    private final UserService userService;

    public UserInit(UserService userService) {
        this.userService = userService;
    }


    @Override
    public void run(String... args) throws Exception {
        if (!userService.getAllUsers().isEmpty()) {
            log.info("There are existing users. Skipping initialization.");
            return;
        }

        log.info("Initializing users from JSON file...");

        try {
            ClassPathResource resource = new ClassPathResource("sample-users.json");
            InputStream inputStream = resource.getInputStream();

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModules(new JavaTimeModule());

            List<UserRequestDto> users = objectMapper.readValue(
                    inputStream,
                    new TypeReference<List<UserRequestDto>>() {}
            );

            for (UserRequestDto userDto : users) {
                userService.createUser(userDto);
                log.info("Created user: {} {}", userDto.getFirstName(), userDto.getLastName());
            }

            log.info("Successfully initialized {} users", users.size());

        } catch (IOException e) {
            log.error("Failed to initialize users from JSON file", e);
        }
    }
}
