package yte.intern.eys.usecases.ongoingevents.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.FormSubmission;
import yte.intern.eys.usecases.events.mapper.EventMapper;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;

import java.util.List;
import java.util.Optional;

import static yte.intern.eys.usecases.common.enums.MessageType.ERROR;
import static yte.intern.eys.usecases.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class OngoingEventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    private final FormSubmissionRepository formSubmissionRepository;
    public MessageResponse checkInToEvent(String eventName, String userName) {
        Optional<FormSubmission> formSubmissionOptional = formSubmissionRepository.findByUserAndEvent(userName, eventName);
        if (formSubmissionOptional.isPresent()) {
            FormSubmission formSubmission = formSubmissionOptional.get();
            formSubmission.setCheckIn(true);
            formSubmissionRepository.save(formSubmission);
            return new MessageResponse(String.format("User %s checked in to %s successfully!", userName, eventName), SUCCESS);
        } else return new MessageResponse(String.format("User %s could not be checked in to %s, please make sure you applied!", userName,eventName), ERROR);
    }

    public List<EventDTO> getOngoingEvents() {
        return eventMapper.mapToDto(eventRepository.findOngoingEvents());
    }

    public Boolean isUserCheckedIn(String username, String eventName) {
        Optional<FormSubmission> formSubmissionOptional = formSubmissionRepository.findByUserAndEvent(username, eventName);
        if (formSubmissionOptional.isPresent()) {
            FormSubmission formSubmission = formSubmissionOptional.get();
            return formSubmission.getCheckIn();
        }
        return false;
    }


}
