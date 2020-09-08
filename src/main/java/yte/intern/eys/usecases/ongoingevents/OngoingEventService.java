package yte.intern.eys.usecases.ongoingevents;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.entity.FormSubmission;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;

import java.util.Optional;

import static yte.intern.eys.usecases.common.enums.MessageType.ERROR;
import static yte.intern.eys.usecases.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class OngoingEventService {

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
}
