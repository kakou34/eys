package yte.intern.eys.usecases.events.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.dto.FormQuestionDTO;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.entity.FormQuestion;
import yte.intern.eys.usecases.events.mapper.EventMapper;
import yte.intern.eys.usecases.events.mapper.FormQuestionMapper;
import yte.intern.eys.usecases.events.service.EventService;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;
    private final FormQuestionMapper formQuestionMapper;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<EventDTO> listAllEvents() {
        List<Event> events = eventService.listAllEvents();
        return eventMapper.mapToDto(events);
    }

    @GetMapping("/next")
    public List<EventDTO> listNextEvents() {
        List<Event> events = eventService.listNextEvents();
        return eventMapper.mapToDto(events);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/old")
    public List<EventDTO> listOldEvents() {
        List<Event> events = eventService.listOldEvents();
        return eventMapper.mapToDto(events);
    }

    @GetMapping("/{eventName}")
    public EventDTO getEventByName(@PathVariable(value= "eventName") String eventName) {
        Event event = eventService.getEventByName(eventName);
        return eventMapper.mapToDto(event);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public MessageResponse addEvent(@Valid @RequestBody EventDTO eventDTO){
        Event event = eventMapper.mapToEntity(eventDTO);
        return eventService.addEvent(event);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{eventName}")
    public MessageResponse updateEvent(@PathVariable(value="eventName") String name, @Valid @RequestBody EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        return eventService.updateEvent(name, event);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{eventName}")
    public MessageResponse deleteEvent(@PathVariable(value="eventName") String name) {
        return eventService.deleteEvent(name);
    }

    //Handle making custom application forms for events
    @GetMapping("/{eventName}/questions")
    public List<FormQuestionDTO> getEventsFormQuestions(@PathVariable(value = "eventName") String name) {
        Set<FormQuestion> formQuestions = eventService.getEventsFormQuestions(name);
        return formQuestionMapper.mapToDto(new ArrayList<>(formQuestions));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{eventName}/questions")
    public MessageResponse addQuestionToEvent(@PathVariable(value = "eventName") String name, @RequestBody @Valid FormQuestionDTO formQuestionDTO) {
        return eventService.addFormQuestionToEvent(name, formQuestionMapper.mapToEntity(formQuestionDTO));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{eventName}/questions/{question}")
    public MessageResponse deleteFormQuestionFromEvent(@PathVariable(value = "eventName") String eventName, @PathVariable(value = "question") String question) {
        return eventService.deleteQuestion(eventName, question);
    }

}
