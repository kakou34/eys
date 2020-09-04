package yte.intern.eys.usecases.events.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.usecases.common.entity.BaseEntity;

import javax.persistence.*;


@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "FSUB_SEQ")
@Table(uniqueConstraints={@UniqueConstraint(columnNames = {"USER_ID" , "EVENT_ID"})})
public class FormSubmission extends BaseEntity {

    @Column(name = "CHECKIN")
    private Boolean checkIn;

    @ManyToOne
    @JoinColumn(name="EVENT_ID", nullable=false)
    private Event event;

    @ManyToOne
    @JoinColumn(name="USER_ID", nullable=false)
    private User user;



}
