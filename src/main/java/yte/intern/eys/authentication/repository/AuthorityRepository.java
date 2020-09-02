package yte.intern.eys.authentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yte.intern.eys.authentication.entity.Authority;
import yte.intern.eys.authentication.entity.EAuthority;

import java.util.Optional;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Optional<Authority> findByName(EAuthority name);
}
