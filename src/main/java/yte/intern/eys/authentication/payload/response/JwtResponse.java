package yte.intern.eys.authentication.payload.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String turkishID;
    private List<String> authorities;

   public JwtResponse(String token, String username, String firstname, String lastname, String email, String turkishID, List<String> authorities) {
       this.token = token;
       this.username = username;
       this.firstname = username;
       this.lastname = username;
       this.email = email;
       this.turkishID = turkishID;
       this.authorities = authorities;
   }
}
