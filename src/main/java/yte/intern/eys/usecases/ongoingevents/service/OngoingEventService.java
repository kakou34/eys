package yte.intern.eys.usecases.ongoingevents.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.authentication.repository.UserRepository;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.entity.FormSubmission;
import yte.intern.eys.usecases.events.mapper.EventMapper;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;
import yte.intern.eys.usecases.ongoingevents.dto.InstantMessageDTO;
import yte.intern.eys.usecases.ongoingevents.entity.InstantMessage;
import yte.intern.eys.usecases.ongoingevents.mapper.InstantMessageMapper;
import yte.intern.eys.usecases.ongoingevents.repository.InstantMessageRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static yte.intern.eys.usecases.common.enums.MessageType.ERROR;
import static yte.intern.eys.usecases.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class OngoingEventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final UserRepository userRepository;
    private final InstantMessageRepository instantMessageRepository;
    private final InstantMessageMapper instantMessageMapper;
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

    public MessageResponse askQuestion(InstantMessageDTO messageDTO) {
        Optional<FormSubmission> formSubmissionOptional = formSubmissionRepository.findByUserAndEvent(messageDTO.getUsername(), messageDTO.getEventName());
        if (formSubmissionOptional.isPresent()) {
            FormSubmission formSubmission = formSubmissionOptional.get();
            if (formSubmission.getCheckIn()) {
                //send question
                InstantMessage instantMessage = new InstantMessage();
                instantMessage.setQuestion(messageDTO.question);
                instantMessage.setEvent(formSubmission.getEvent());
                instantMessage.setUser(formSubmission.getUser());
                instantMessageRepository.save(instantMessage);
                return new MessageResponse(" Your question has been sent successfully ", SUCCESS);
            } else return new MessageResponse(String.format("Sorry, you did not check in for %s ", messageDTO.getEventName()), ERROR);
        } else return new MessageResponse(String.format("Sorry, you did not apply for %s ", messageDTO.getEventName()), ERROR);
    }

    public List<InstantMessageDTO> findByEventName (String eventName) {
        List<InstantMessage> messages = instantMessageRepository.findByEventName(eventName);
        List<InstantMessageDTO> messageDTOList = new ArrayList<>();
        for (InstantMessage message: messages) {
            messageDTOList.add(new InstantMessageDTO(message.getQuestion(), message.getEvent().getName(), message.getUser().getUsername()));
        }
        return messageDTOList;
    }
}
