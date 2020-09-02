package yte.intern.eys.usecases.events.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Getter
@Builder
public class EventDTO {

    @JsonProperty("name")
    @Size(min = 3, max = 255, message = "Event name can't be longer than 255 and shorter than 3!")
    public final String name;


    @JsonProperty("startDate")
    @NotNull(message = "Start date must be given")
    public final LocalDate startDate;

    @NotNull(message = "End date must be given")
    @JsonProperty("endDate")
    public final LocalDate endDate;

    @JsonProperty("quota")
    @NotNull(message = "Event quota is required")
    public final Integer quota;

    @JsonProperty("altitude")
    @Min(value = -90, message = "Latitude cannot be less than -90")
    @Max(value = 90, message = "Latitude cannot be more than 90")
    @NotNull(message = "Event geographical location is required")
    public final Double altitude;

    @JsonProperty("longitude")
    @NotNull(message = "Event geographical location is required")
    @Min(value = -180, message = "Longitude cannot be less than -180")
    @Max(value = 180, message = "Latitude cannot be more than 180")
    public final Double longitude;

    @JsonCreator
    public EventDTO(@JsonProperty("name") String name,
                      @JsonProperty("startDate") LocalDate startDate,
                      @JsonProperty("endDate") LocalDate endDate,
                      @JsonProperty("quota") Integer quota,
                      @JsonProperty("altitude") Double altitude,
                      @JsonProperty("longitude") Double longitude) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.quota = quota;
        this.altitude = altitude;
        this.longitude = longitude;

    }

    @AssertTrue(message = "End date cannot be before start date")
    public boolean isEndDateValid() {
        return !(this.endDate.isBefore(this.startDate));
    }
}



