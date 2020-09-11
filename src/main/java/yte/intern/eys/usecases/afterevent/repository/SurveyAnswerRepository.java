package yte.intern.eys.usecases.afterevent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.afterevent.entity.SurveyAnswer;
import yte.intern.eys.usecases.afterevent.entity.SurveyQuestion;

import java.util.List;


@Repository
public interface SurveyAnswerRepository extends JpaRepository<SurveyAnswer, Long> {
    List<SurveyAnswer> findBySurveyQuestion(SurveyQuestion surveyQuestion);
}
