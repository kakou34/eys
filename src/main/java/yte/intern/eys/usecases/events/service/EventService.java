package yte.intern.eys.usecases.events.service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.entity.FormQuestion;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormQuestionRepository;
import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import static yte.intern.eys.usecases.common.enums.MessageType.ERROR;
import static yte.intern.eys.usecases.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final FormQuestionRepository formQuestionRepository;

    public List<Event> listAllEvents() {
        return eventRepository.findAll(Sort.by(Sort.Direction.DESC, "startDate"));
    }
    public List<Event> listNextEvents() {
        LocalDate today = LocalDate.now();
        return eventRepository.findByStartDateAfter(today);
    }
    public List<Event> listOldEvents() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        return eventRepository.findByStartDateBefore(tomorrow);
    }

    public Event getEventByName(String name) {
        return eventRepository.findByName(name).orElseThrow(EntityNotFoundException::new);
    }

    public MessageResponse addEvent(Event event) {
        if(eventRepository.existsByName(event.getName())) {
            return new MessageResponse("An event with this name already exists!", ERROR);
        }
        eventRepository.save(event);
        return new MessageResponse("Event has been added successfully!", SUCCESS);
    }

    @Transactional
    public MessageResponse updateEvent(String name, Event event) {
        Optional<Event> eventOptional = eventRepository.findByName(name);
        if (eventOptional.isPresent()) {
            Event eventFromDB = eventOptional.get();
            if(eventFromDB.getStartDate().isBefore(LocalDate.now())) {
                return new MessageResponse("You cannot update an event after its start date", ERROR);
            } else {
            updateEventFromDB(event, eventFromDB);
            eventRepository.save(eventFromDB);
            return new MessageResponse(String.format("Event with name %s has been updated successfully!", name), SUCCESS);
            }
        } else {
            return new MessageResponse(String.format("Event with name %s can't be found!", name), ERROR);
        }
    }

    private void updateEventFromDB(Event event, Event eventFromDB) {
        eventFromDB.setName(event.getName());
        eventFromDB.setStartDate(event.getStartDate());
        eventFromDB.setEndDate(event.getEndDate());
        eventFromDB.setQuota(event.getQuota());
        eventFromDB.setAltitude(event.getAltitude());
        eventFromDB.setLongitude(event.getLongitude());
    }

    public MessageResponse deleteEvent(String name) {
        Optional<Event> eventOptional = eventRepository.findByName(name);
        if (eventOptional.isPresent()) {
            Event eventFromDB = eventOptional.get();
            if(eventFromDB.getStartDate().isBefore(LocalDate.now())) {
                return new MessageResponse("You cannot delete an event after its start date", ERROR);
            } else {
                eventRepository.deleteByName(name);
                return new MessageResponse("Event has been deleted successfully!", SUCCESS);
            }
        } else {
            return new MessageResponse(String.format("Event with name %s can't be found!", name), ERROR);
        }
    }

    // Managing Event Application form's questions:

    public Set<FormQuestion> getEventsFormQuestions(String name) {
        return eventRepository.findByName(name).map(Event::getFormQuestions)
                .orElseThrow(EntityNotFoundException::new);
    }

    public MessageResponse addFormQuestionToEvent(String eventName, FormQuestion formQuestion) {
        Optional<Event> eventOptional = eventRepository.findByName(eventName);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            if (event.hasFormQuestion(formQuestion.getQuestion())) {
                return new MessageResponse("This question already exists", ERROR);
            }
            formQuestion.setEvent(event);
            formQuestionRepository.save(formQuestion);

            return new MessageResponse("The question has been successfully added", SUCCESS);
        } else {
            return new MessageResponse(String.format("Event - %s - can't be found!", eventName), ERROR);
        }
    }

    public MessageResponse deleteQuestion(String eventName, String question) {
        Optional<FormQuestion> formQuestionOptional = formQuestionRepository.findByQuestion(question);
        if (formQuestionOptional.isPresent()) {
            FormQuestion formQuestion = formQuestionOptional.get();
            formQuestionRepository.delete(formQuestion);
            return new MessageResponse("The question has been deleted successfully!", SUCCESS);
        }
        return new MessageResponse(String.format("Question %s can't be found!", question), ERROR);
    }
}
