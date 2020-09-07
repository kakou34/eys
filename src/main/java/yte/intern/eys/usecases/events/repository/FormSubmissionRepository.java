package yte.intern.eys.usecases.events.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.events.dto.EventSubmissionsPerDayDTO;
import yte.intern.eys.usecases.events.entity.FormSubmission;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormSubmissionRepository extends JpaRepository<FormSubmission, Long> {
    @Query("select f from FormSubmission f where f.user.username = :username and f.event.name = :eventname")
    Optional<FormSubmission> findByUserAndEvent(String username, String eventname);

    @Query("SELECT new yte.intern.eys.usecases.events.dto.EventSubmissionsPerDayDTO(fs.appDate, COUNT(fs.id)) FROM FormSubmission AS fs where fs.event.name=:eventName GROUP BY fs.appDate ")
    List<EventSubmissionsPerDayDTO> getSubmissionPerDay(String eventName, Pageable pageable);
}
