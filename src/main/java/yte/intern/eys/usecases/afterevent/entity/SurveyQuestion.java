package yte.intern.eys.usecases.afterevent.entity;
import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.usecases.common.entity.BaseEntity;
import yte.intern.eys.usecases.events.entity.Event;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "SQUES_SEQ")
public class SurveyQuestion extends BaseEntity {

    @Column(name = "QUESTION")
    private String question;

    @ManyToOne
    @JoinColumn(name="EVENT_ID", nullable=false)
    private Event event;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "surveyQuestion")
    private Set<SurveyAnswer> surveyAnswers;


}