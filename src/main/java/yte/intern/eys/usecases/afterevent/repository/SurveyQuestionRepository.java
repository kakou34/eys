package yte.intern.eys.usecases.afterevent.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.afterevent.entity.SurveyQuestion;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.entity.FormQuestion;

import java.util.Optional;

@Repository
public interface SurveyQuestionRepository extends JpaRepository<SurveyQuestion, Long> {
    Optional<SurveyQuestion> findByQuestion (String question);
    Optional<SurveyQuestion> findByQuestionAndEvent(String question, Event event);
}