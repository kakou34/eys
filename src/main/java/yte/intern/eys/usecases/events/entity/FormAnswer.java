package yte.intern.eys.usecases.events.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.usecases.common.entity.BaseEntity;
import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "FANS_SEQ")
public class FormAnswer extends BaseEntity {
    @Column(name = "ANSWER")
    private String answer;
}
