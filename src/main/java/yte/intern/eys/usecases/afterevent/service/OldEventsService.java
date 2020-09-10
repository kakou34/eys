package yte.intern.eys.usecases.afterevent.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.mapper.EventMapper;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OldEventsService {

    private final EventRepository eventRepository;
    private final FormSubmissionRepository formSubmissionRepository;
    private final EventMapper eventMapper;

    public List<EventDTO> getOldEventsByUser(String username) {
        List<Long> eventIds = formSubmissionRepository.findEventsByAttendee(username);
        List<Event> events = eventRepository.findByIdIn(eventIds);
        return eventMapper.mapToDto(events);
    }
}
