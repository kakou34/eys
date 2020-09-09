package yte.intern.eys.usecases.ongoingevents.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstantMessage {

    private String sender;
    private String event;
    private String content;
}
