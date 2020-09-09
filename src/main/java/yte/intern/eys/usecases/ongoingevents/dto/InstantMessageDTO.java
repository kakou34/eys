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

    public InstantMessageDTO(@JsonProperty("question") String question) {
        this.question = question;
    }
}
