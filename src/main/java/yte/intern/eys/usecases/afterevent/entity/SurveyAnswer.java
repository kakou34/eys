package yte.intern.eys.usecases.afterevent.entity;
import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.usecases.common.entity.BaseEntity;
import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "SANS_SEQ")
@Table(uniqueConstraints={@UniqueConstraint(columnNames = {"USER_ID" , "QUESTION_ID"})})
public class SurveyAnswer extends BaseEntity {
    @Column(name = "ANSWER")
    private String answer;

    @ManyToOne
    @JoinColumn(name="QUESTION_ID", nullable=false)
    private SurveyQuestion surveyQuestion;

    @ManyToOne
    @JoinColumn(name="USER_ID", nullable=false)
    private User user;

}
