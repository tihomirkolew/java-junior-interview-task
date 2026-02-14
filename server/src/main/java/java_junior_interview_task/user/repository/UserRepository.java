package java_junior_interview_task.user.repository;

import java_junior_interview_task.user.entity.User;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Pageable;

@RestController
public interface UserRepository extends JpaRepository<User, Integer> {

    Page<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCaseOrderByLastNameAscDateOfBirthAsc(
            String firstName, String lastName, String email, String phoneNumber, Pageable pageable
    );

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
