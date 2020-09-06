package yte.intern.eys.usecases.events.repository;

import org.checkerframework.checker.nullness.Opt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.events.entity.FormSubmission;

import java.util.Optional;

@Repository
public interface FormSubmissionRepository extends JpaRepository<FormSubmission, Long> {
    @Query("select f from FormSubmission f where f.user.username = :username and f.event.name = :eventname")
    Optional<FormSubmission> findByUserAndEvent(String username, String eventname);
}
