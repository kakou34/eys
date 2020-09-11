package yte.intern.eys.usecases.afterevent.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Builder
@Getter
public class SurveyQuestionDTO {

    @JsonProperty("question")
    @Size(max = 255, message = "Question can be at most 255 characters!")
    @NotBlank
    public final String question;

    public SurveyQuestionDTO(@JsonProperty("question") String question) {
        this.question = question;
    }
}
