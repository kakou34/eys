package yte.intern.eys.usecases.common.dto;

import lombok.AllArgsConstructor;
import yte.intern.eys.usecases.common.enums.MessageType;

@AllArgsConstructor
public class MessageResponse {
    public final String message;
    public final MessageType messageType;
}
