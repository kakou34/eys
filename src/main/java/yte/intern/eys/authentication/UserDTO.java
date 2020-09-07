package yte.intern.eys.authentication;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Getter
@Builder
public class UserDTO {

    @JsonProperty("firstname")
    public final String firstname;

    @JsonProperty("lastname")
    public final String lastname;

    @JsonProperty("username")
    public final String username;

    @JsonProperty("email")
    public final String email;

    @JsonProperty("turkishID")
    private final String turkishID;


    @JsonCreator
    public UserDTO(@JsonProperty("firstname") String firstname,
                    @JsonProperty("lastname") String lastname,
                    @JsonProperty("username") String username,
                    @JsonProperty("email") String email,
                    @JsonProperty("turkishID") String turkishID) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.turkishID = turkishID;

    }

}
