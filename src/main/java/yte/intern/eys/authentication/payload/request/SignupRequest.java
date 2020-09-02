package yte.intern.eys.authentication.payload.request;

import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.validation.TcKimlikNo;

import java.util.Set;

import javax.validation.constraints.*;

@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    private String firstname;

    @NotBlank
    private String lastname;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private Set<String> authority;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @TcKimlikNo
    private String turkishID;
}
