package java_junior_interview_task.user.service;

import java_junior_interview_task.exception.*;
import java_junior_interview_task.security.Authentication;
import java_junior_interview_task.user.dto.LoginRequest;
import java_junior_interview_task.user.dto.RegisterRequest;
import java_junior_interview_task.user.entity.User;
import java_junior_interview_task.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new EmailDuplicateException("Email already in use.");
        }

        if (userRepository.existsByPhoneNumber(registerRequest.getPhoneNumber())) {
            throw new PhoneNumberDuplicateException("Phone number already in use.");
        }

        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .dateOfBirth(registerRequest.getDateOfBirth())
                .phoneNumber(registerRequest.getPhoneNumber())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        return userRepository.save(user);
    }

    public User login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new NoUserFoundByEmailException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IncorrectPasswordException("Invalid email or password");
        }

        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));

        return new Authentication(
                user.getId(),
                user.getEmail(),
                user.getPassword()
        );
    }
}