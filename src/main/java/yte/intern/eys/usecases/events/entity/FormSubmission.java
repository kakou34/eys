package yte.intern.eys.usecases.events.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.usecases.common.entity.BaseEntity;

import javax.persistence.*;


@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "FSUB_SEQ")
public class FormSubmission extends BaseEntity {

    @Column(name = "CHECKIN")
    private Boolean checkIn;



}
