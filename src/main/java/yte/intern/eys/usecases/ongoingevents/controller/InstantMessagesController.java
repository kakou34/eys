package yte.intern.eys.usecases.ongoingevents.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.ongoingevents.dto.InstantMessageDTO;
import yte.intern.eys.usecases.ongoingevents.service.OngoingEventService;


@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/ask")
public class InstantMessagesController {
    private final OngoingEventService ongoingEventService;

    @PostMapping("/{eventName}/{userName}")
    public MessageResponse askQuestion(@PathVariable(value = "eventName") String eventName, @PathVariable(value = "userName") String userName, @RequestBody InstantMessageDTO message) {
        return  ongoingEventService.askQuestion(eventName, userName, message);
    }


}
