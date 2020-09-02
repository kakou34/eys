package yte.intern.eys.usecases.events.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FormSubmissionDTO {

    @JsonProperty("checkin")
    public final Boolean checkin;

    public FormSubmissionDTO(@JsonProperty("checkin") Boolean checkin) {
        this.checkin = checkin;
    }
}
