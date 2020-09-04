package yte.intern.eys.usecases.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.usecases.events.entity.FormSubmission;

@Repository
public interface FormSubmissionRepository extends JpaRepository<FormSubmission, Long> {


}
