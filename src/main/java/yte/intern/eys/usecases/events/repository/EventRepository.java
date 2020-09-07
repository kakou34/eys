package yte.intern.eys.usecases.events.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.eys.usecases.events.dto.EventSubmissionCountDTO;
import yte.intern.eys.usecases.events.entity.Event;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByName (String name);
    boolean existsByName(String name);
    @Transactional
    void deleteByName(String name);

    List<Event> findByStartDateAfter(LocalDate date);

    List<Event> findByStartDateBefore(LocalDate date);

    @Query(value = "select new yte.intern.eys.usecases.events.dto.EventSubmissionCountDTO(event.name , size(event.formSubmissions)) from Event as event order by size(event.formSubmissions) desc ")
    List<EventSubmissionCountDTO> findEventsSubmissionCount(Pageable pageable);
}
