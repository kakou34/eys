package yte.intern.eys.usecases.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.events.entity.FormAnswer;

@Repository
public interface FormAnswerRepository extends JpaRepository<FormAnswer, Long> {
}
