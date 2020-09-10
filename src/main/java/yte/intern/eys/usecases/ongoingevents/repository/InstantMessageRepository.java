package yte.intern.eys.usecases.ongoingevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import yte.intern.eys.usecases.ongoingevents.entity.InstantMessage;
import java.util.List;

@Repository
public interface InstantMessageRepository extends JpaRepository<InstantMessage, Long> {

    @Query("from InstantMessage as im where im.event.name = :eventName")
    List<InstantMessage> findByEventName(String eventName);

}
