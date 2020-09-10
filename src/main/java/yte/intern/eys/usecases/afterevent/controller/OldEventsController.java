package yte.intern.eys.usecases.afterevent.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.eys.usecases.afterevent.service.OldEventsService;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.mapper.EventMapper;

import java.util.List;


@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/oldEvents")
public class OldEventsController {

    private final OldEventsService oldEventsService;
    @GetMapping("/byUser/{username}")
    public List<EventDTO> listOldEventsByUser(@PathVariable(value= "username") String username) {
        return oldEventsService.getOldEventsByUser(username);
    }
}
