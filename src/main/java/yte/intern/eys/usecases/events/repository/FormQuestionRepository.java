package yte.intern.eys.usecases.events.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.events.entity.FormQuestion;

import java.util.Optional;

@Repository
public interface FormQuestionRepository extends JpaRepository<FormQuestion, Long> {
    Optional<FormQuestion> findByQuestion (String question);
    boolean existsByQuestion(String question);
    boolean existsByQuestionAndEventId(String question, Long eventID);


}
