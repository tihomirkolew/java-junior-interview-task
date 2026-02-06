package java_junior_interview_task.user.repository;

import java_junior_interview_task.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public interface UserRepository extends JpaRepository<User, UUID> {


}
