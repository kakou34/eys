package yte.intern.eys.usecases.events.entity;
import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.usecases.common.entity.BaseEntity;
import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "FQUES_SEQ")
public class FormQuestion extends BaseEntity {

    @Column(name = "QUESTION")
    private String question;

    @ManyToOne
    @JoinColumn(name="EVENT_ID", nullable=false)
    private Event event;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "QUESTION_ID")
    private Set<FormAnswer> formAnswers;


}