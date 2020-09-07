package yte.intern.eys.usecases.events.dto;

import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventSubmissionCountDTO {
    private String EventName;
    private Integer SubmissionCount;

}