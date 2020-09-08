package yte.intern.eys.usecases.events.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.usecases.events.dto.EventSubmissionCountDTO;
import yte.intern.eys.usecases.events.dto.EventSubmissionsPerDayDTO;
import yte.intern.eys.usecases.events.dto.QuestionAnswerDTO;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.entity.FormSubmission;
import yte.intern.eys.usecases.events.repository.EventRepository;
import yte.intern.eys.usecases.events.repository.FormAnswerRepository;
import yte.intern.eys.usecases.events.repository.FormSubmissionRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedBackService {

    private final FormSubmissionRepository formSubmissionRepository;
    private final EventRepository eventRepository;
    private final FormAnswerRepository formAnswerRepository;

    public List<User> getAllApplicants (String eventName) {
        Optional<Event> eventOptional =  eventRepository.findByName(eventName);
        List<User> applicants = new ArrayList<>();
        if(eventOptional.isPresent()) {
            Event event= eventOptional.get();
            for (FormSubmission fs: event.getFormSubmissions()
                 ) {
                applicants.add(fs.getUser());
            }
        }
        return applicants;
    }

    public List<QuestionAnswerDTO> getQuestionsAnswers (String username, String eventName) {
        Optional<Event> eventOptional =  eventRepository.findByName(eventName);

        return eventOptional.map(event -> formAnswerRepository.questionsAnswersByUserAndQuestions(username, event.getFormQuestions())).orElse(null);
    }

    public List<EventSubmissionCountDTO> getEventsBySubmissionCount () {
        return eventRepository.findEventsSubmissionCount( PageRequest.of(0, 10) );
    }

    public List<EventSubmissionsPerDayDTO> getSubmissionsPerDay(String eventName) {
        return formSubmissionRepository.getSubmissionPerDay(eventName, PageRequest.of(0, 10));
    }


}
