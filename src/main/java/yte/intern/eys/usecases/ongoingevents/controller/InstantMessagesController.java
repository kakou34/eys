package yte.intern.eys.usecases.ongoingevents.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.ongoingevents.dto.InstantMessageDTO;
import yte.intern.eys.usecases.ongoingevents.service.OngoingEventService;

import java.util.List;


@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/ask")
public class InstantMessagesController {
    private final OngoingEventService ongoingEventService;

    @PostMapping
    public MessageResponse askQuestion(@RequestBody InstantMessageDTO message) {
        return  ongoingEventService.askQuestion(message);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/questions/{eventName}")
    public List<InstantMessageDTO> findQuestionsByEvent(@PathVariable(value = "eventName") String eventName) {
        return ongoingEventService.findByEventName(eventName);
    }

    @MessageMapping("/newMessage")
    @SendTo("/topic/newMessage")
    public String newMessage(String eventName ) throws Exception {
        return eventName;
    }



}
