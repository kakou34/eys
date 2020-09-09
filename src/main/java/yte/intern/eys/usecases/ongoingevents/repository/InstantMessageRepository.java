package yte.intern.eys.usecases.ongoingevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.events.entity.FormAnswer;
import yte.intern.eys.usecases.ongoingevents.entity.InstantMessage;

@Repository
public interface InstantMessageRepository extends JpaRepository<InstantMessage, Long> {

}
