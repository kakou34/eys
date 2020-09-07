package yte.intern.eys.usecases.events.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class FormSubmissionDTO {

    @JsonProperty("checkin")
    public final Boolean checkin;

    @JsonProperty("appDate")
    public final LocalDate appDate;

    public FormSubmissionDTO(@JsonProperty("checkin") Boolean checkin, @JsonProperty("appDate") LocalDate appDate) {
        this.checkin = checkin;
        this.appDate = appDate;
    }
}
