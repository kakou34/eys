package yte.intern.eys.authentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import yte.intern.eys.authentication.payload.request.LoginRequest;
import yte.intern.eys.authentication.payload.request.SignupRequest;
import yte.intern.eys.authentication.payload.response.JwtResponse;
import yte.intern.eys.authentication.repository.UserRepository;
import yte.intern.eys.authentication.security.jwt.JwtUtils;
import yte.intern.eys.authentication.security.services.CustomUserDetails;
import yte.intern.eys.authentication.security.services.UserService;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.common.enums.MessageType;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails ) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getUsername(),
                userDetails.getFirstname(),
                userDetails.getLastname(),
                userDetails.getEmail(),
                userDetails.getTurkishID(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!", MessageType.ERROR));
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!", MessageType.ERROR));
        }
        if (userRepository.existsByTurkishID(signUpRequest.getTurkishID())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: TC is already in use!", MessageType.ERROR));
        }

        return userService.addUser(signUpRequest);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addAdmin")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!", MessageType.ERROR));
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!", MessageType.ERROR));
        }
        if (userRepository.existsByTurkishID(signUpRequest.getTurkishID())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: TC is already in use!", MessageType.ERROR));
        }

        return userService.addAdmin(signUpRequest);
    }



}
