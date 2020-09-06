package yte.intern.eys.usecases.events.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
@Getter
public class FormAnswerDTO {

    @JsonProperty("answer")
    @Size(max = 255, message = "Answer can be at most 255 characters!")
    @NotBlank
    public final String answer;

    public FormAnswerDTO(@JsonProperty("answer") String answer) {
        this.answer = answer;
    }
}
