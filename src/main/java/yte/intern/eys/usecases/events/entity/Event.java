package yte.intern.eys.usecases.events.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.usecases.common.entity.BaseEntity;
import yte.intern.eys.usecases.ongoingevents.entity.InstantMessage;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Optional;
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

    @OneToMany(mappedBy="event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<FormSubmission> formSubmissions;

    @OneToMany(mappedBy="event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<InstantMessage> instantMessages;

    public boolean hasFormQuestion(String question) {
        return formQuestions.stream().anyMatch(it -> it.getQuestion().equals(question));
    }

    public Optional<FormQuestion> getQuestion(String question) {
        return formQuestions.stream().filter(it -> it.getQuestion().equals(question)).findFirst();
    }


}

