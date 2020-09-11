package yte.intern.eys.usecases.events.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
@Getter
public class FormQuestionDTO {
    @JsonProperty("question")
    @Size(max = 255, message = "Question can be at most 255 characters!")
    @NotBlank
    public final String question;

    public FormQuestionDTO(@JsonProperty("question") String question) {
        this.question = question;
    }
}
