package yte.intern.eys.usecases.events.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionAnswerDTO {

    private String question;
    private String answer;

}
