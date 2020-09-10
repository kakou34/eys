package yte.intern.eys.usecases.ongoingevents.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;

@Builder
@Getter
public class InstantMessageDTO {
    @JsonProperty("question")
    @Size(max = 255, message = "Answer can be at most 255 characters!")
    @NotBlank
    public final String question;

    @JsonProperty("eventName")
    @NotBlank
    public final String eventName;

    @JsonProperty("username")
    @NotBlank
    public final String username;

    public InstantMessageDTO(@JsonProperty("question") String question, @JsonProperty("eventName") String eventName, @JsonProperty("username") String username) {
        this.question = question;
        this.eventName = eventName;
        this.username = username;
    }
}
