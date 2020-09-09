package yte.intern.eys.usecases.ongoingevents.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.usecases.common.entity.BaseEntity;
import yte.intern.eys.usecases.events.entity.Event;

import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "IMES_SEQ")
public class InstantMessage extends BaseEntity {
    @Column(name = "Content")
    private String content;

    @ManyToOne
    @JoinColumn(name="EVENT_ID", nullable=false)
    private Event event;

    @ManyToOne
    @JoinColumn(name="USER_ID", nullable=false)
    private User user;

}
