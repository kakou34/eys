package yte.intern.eys.usecases.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.events.dto.FormAnswerDTO;
import yte.intern.eys.usecases.events.dto.QuestionAnswerDTO;
import yte.intern.eys.usecases.events.entity.FormAnswer;
import yte.intern.eys.usecases.events.entity.FormQuestion;
import java.util.List;
import java.util.Set;

@Repository
public interface FormAnswerRepository extends JpaRepository<FormAnswer, Long> {
    @Query("select new yte.intern.eys.usecases.events.dto.QuestionAnswerDTO( q.question , a.answer ) from FormQuestion as q inner join q.formAnswers as a where a.user.username=:username and a.formQuestion in :questions")
    List<QuestionAnswerDTO> questionsAnswersByUserAndQuestions(String username, Set<FormQuestion> questions);

}
