package yte.intern.eys.usecases.events.dto;

import lombok.*;


import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventSubmissionsPerDayDTO {
    private LocalDate day;
    private Long SubmissionCount;

}
