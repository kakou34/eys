package yte.intern.eys.usecases.afterevent.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.usecases.afterevent.entity.SurveyAnswer;
import yte.intern.eys.usecases.afterevent.repository.SurveyAnswerRepository;
import yte.intern.eys.usecases.afterevent.repository.SurveyQuestionRepository;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.afterevent.entity.SurveyQuestion;
import yte.intern.eys.usecases.events.entity.FormSubmission;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.Set;

import static yte.intern.eys.usecases.common.enums.MessageType.ERROR;
import static yte.intern.eys.usecases.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class SurveyService {
    private final EventRepository eventRepository;
    private final SurveyQuestionRepository surveyQuestionRepository;
    private final SurveyAnswerRepository surveyAnswerRepository;
    private final FormSubmissionRepository formSubmissionRepository;

    //Add survey question to event
    public MessageResponse addSurveyQuestionToEvent(String eventName, SurveyQuestion SurveyQuestion) {
        Optional<Event> eventOptional = eventRepository.findByName(eventName);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            if (event.hasSurveyQuestion(SurveyQuestion.getQuestion())) {
                return new MessageResponse("This question already exists", ERROR);
            }
            SurveyQuestion.setEvent(event);
            surveyQuestionRepository.save(SurveyQuestion);
            return new MessageResponse("The question has been successfully added", SUCCESS);
        } else {
            return new MessageResponse(String.format("Event - %s - can't be found!", eventName), ERROR);
        }
    }

    //delete survey question from event
    public MessageResponse deleteQuestion(String eventName, String question) {
        Optional<SurveyQuestion> surveyQuestionOptional = surveyQuestionRepository.findByQuestion(question);
        if (surveyQuestionOptional.isPresent()) {
            SurveyQuestion surveyQuestion = surveyQuestionOptional.get();
            surveyQuestionRepository.delete(surveyQuestion);
            return new MessageResponse("The question has been deleted successfully!", SUCCESS);
        }
        return new MessageResponse(String.format("Question %s can't be found!", question), ERROR);
    }

    //get all survey questions of an event
    public Set<SurveyQuestion> getEventsSurveyQuestions(String name) {
        return eventRepository.findByName(name).map(Event::getSurveyQuestions)
                .orElseThrow(EntityNotFoundException::new);
    }

    //add answer to a survey question
    public MessageResponse addAnswer(String eventName, String username, String question, SurveyAnswer surveyAnswer) {
        Optional<FormSubmission> formSubmissionOptional = formSubmissionRepository.findByUserAndEvent(username, eventName);
        if (formSubmissionOptional.isPresent()) {
            if (formSubmissionOptional.get().getCheckIn()) {
                User user = formSubmissionOptional.get().getUser();
                Event event = formSubmissionOptional.get().getEvent();
                Optional<SurveyQuestion> surveyQuestionOptional = event.getSurveyQuestion(question);
                if (surveyQuestionOptional.isPresent()) {
                    SurveyQuestion surveyQuestion = surveyQuestionOptional.get();
                    surveyAnswer.setSurveyQuestion(surveyQuestion);
                    surveyAnswer.setUser(user);
                    surveyAnswerRepository.save(surveyAnswer);
                    return new MessageResponse("Answer Added Successfully!", SUCCESS);
                } else {
                    return new MessageResponse(String.format("Event - %s - does not have the question %s!", eventName, question), ERROR);
                }
            } else return new MessageResponse(String.format("You did not checkIn for %s", eventName), ERROR);
        } else return new MessageResponse(String.format("You did not apply for %s", eventName), ERROR);
    }

    //check if event has a survey
    public boolean hasSurvey (String eventName) {
        Optional<Event> eventOptional = eventRepository.findByName(eventName);
        return eventOptional.map(Event::hasSurvey).orElse(false);
    }

    //get answers of question
}
