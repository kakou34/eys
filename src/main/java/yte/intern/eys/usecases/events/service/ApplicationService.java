package yte.intern.eys.usecases.events.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.authentication.repository.UserRepository;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.entity.FormAnswer;
import yte.intern.eys.usecases.events.entity.FormQuestion;
import yte.intern.eys.usecases.events.entity.FormSubmission;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormAnswerRepository;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;
import java.util.Optional;
import static yte.intern.eys.usecases.common.enums.MessageType.ERROR;
import static yte.intern.eys.usecases.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final FormAnswerRepository formAnswerRepository;
    private final FormSubmissionRepository formSubmissionRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;


    public MessageResponse addSubmission(String eventName, String username) {
        Optional<Event> eventOptional = eventRepository.findByName(eventName);
        Optional<User> userOptional =  userRepository.findByUsername(username);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            if(userOptional.isPresent()){
                User user = userOptional.get();
                if(event.getQuota() > event.getFormSubmissions().size()) {
                FormSubmission formSubmission = new FormSubmission();
                formSubmission.setEvent(event);
                formSubmission.setUser(user);
                formSubmission.setCheckIn(false);
                formSubmissionRepository.save(formSubmission);
                } else return new MessageResponse(String.format("Sorry, the quota is full for this event - %s -", eventName), ERROR);
            } else {
                return new MessageResponse(String.format("User - %s - can't be found!", username), ERROR);
            }
            return new MessageResponse("Your application has been submitted successfully", SUCCESS);
        } else {
            return new MessageResponse(String.format("Event - %s - can't be found!", eventName), ERROR);
        }
    }

    public MessageResponse addAnswer(String eventName, String username, String question, FormAnswer formAnswer) {
        Optional<Event> eventOptional = eventRepository.findByName(eventName);
        Optional<User> userOptional =  userRepository.findByUsername(username);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            if(userOptional.isPresent()){
                User user = userOptional.get();
                Optional<FormQuestion> formQuestionOptional = event.getQuestion(question);
                if (formQuestionOptional.isPresent()) {
                    FormQuestion formQuestion = formQuestionOptional.get();
                    formAnswer.setFormQuestion(formQuestion);
                    formAnswer.setUser(user);
                    formAnswerRepository.save(formAnswer);
                } else {
                    return new MessageResponse(String.format("Event - %s - does not have the question %s!", eventName, question), ERROR);
                }
            } else {
                return new MessageResponse(String.format("User - %s - can't be found!", username), ERROR);
            }
            return new MessageResponse("The question has been successfully added", SUCCESS);
        } else {
            return new MessageResponse(String.format("Event - %s - can't be found!", eventName), ERROR);
        }
    }
}
