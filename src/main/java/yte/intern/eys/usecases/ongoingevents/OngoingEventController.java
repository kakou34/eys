package yte.intern.eys.usecases.ongoingevents;


import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.Event;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/ongoing")
public class OngoingEventController {

    private final OngoingEventService ongoingEventService;

    @GetMapping("/events")
    public List<EventDTO> getOngoingEvents() {
        return ongoingEventService.getOngoingEvents();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/checkIn/{eventName}/{userName}")
    public MessageResponse checkInToEvent(@PathVariable(value = "eventName") String eventName, @PathVariable(value = "userName") String userName) {
        return ongoingEventService.checkInToEvent(eventName, userName);
    }
}
