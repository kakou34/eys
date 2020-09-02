package yte.intern.eys.usecases.events.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.usecases.common.entity.BaseEntity;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "EVENT_SEQ")
public class Event extends BaseEntity {

    @Column(name = "NAME", unique = true)
    private String name;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "QUOTA")
    private Integer quota;

    @Column(name = "ALTITUDE")
    private Double altitude;

    @Column(name = "LONGITUDE")
    private Double longitude;

    @OneToMany(mappedBy="event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<FormQuestion> formQuestions;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "EVENT_ID")
    private Set<FormSubmission> formSubmissions;

    public boolean hasFormQuestion(String question) {
        return formQuestions.stream().anyMatch(it -> it.getQuestion().equals(question));
    }


}

