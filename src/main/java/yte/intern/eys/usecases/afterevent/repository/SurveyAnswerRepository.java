package yte.intern.eys.usecases.afterevent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.afterevent.entity.SurveyAnswer;


@Repository
public interface SurveyAnswerRepository extends JpaRepository<SurveyAnswer, Long> {

}
