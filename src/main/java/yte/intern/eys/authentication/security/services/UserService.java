package yte.intern.eys.authentication.security.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import yte.intern.eys.authentication.entity.Authority;
import yte.intern.eys.authentication.entity.EAuthority;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.authentication.payload.request.SignupRequest;
import yte.intern.eys.authentication.repository.AuthorityRepository;
import yte.intern.eys.authentication.repository.UserRepository;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.common.enums.MessageType;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthorityRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;

    public ResponseEntity<?> addUser(SignupRequest signUpRequest) {
        Set<String> userAuths = new HashSet<>();
        userAuths.add("user");
        return addUser(signUpRequest, userAuths );
    }

    public ResponseEntity<?> addAdmin(SignupRequest signUpRequest) {
        Set<String> adminAuths = new HashSet<>();
        adminAuths.add("user");
        adminAuths.add("admin");
        return addUser(signUpRequest, adminAuths );
    }

    public ResponseEntity<?> addUser(SignupRequest signUpRequest, Set<String> strAuthorities ) {
        // Create new user's account
        User user = new User(null,
                signUpRequest.getUsername(),
                signUpRequest.getFirstname(),
                signUpRequest.getLastname(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getTurkishID(),
                new HashSet<>(),
                new HashSet<>(),
                new HashSet<>());
        //Set<String> strAuthorities = signUpRequest.getAuthority();
        Set<Authority> authorities = new HashSet<>();

        if (strAuthorities == null) {
            Authority userAuthority = roleRepository.findByName(EAuthority.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            authorities.add(userAuthority);
        } else {
            strAuthorities.forEach(role -> {
                if ("admin".equals(role)) {
                    Authority adminAuthority = roleRepository.findByName(EAuthority.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    authorities.add(adminAuthority);
                } else {
                    Authority userAuthority = roleRepository.findByName(EAuthority.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    authorities.add(userAuthority);
                }
            });
        }

        user.setAuthorities(authorities);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!", MessageType.SUCCESS));
    }



}
