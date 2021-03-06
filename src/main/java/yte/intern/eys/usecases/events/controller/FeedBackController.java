package yte.intern.eys.usecases.events.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.eys.authentication.UserDTO;
import yte.intern.eys.authentication.UserMapper;
import yte.intern.eys.usecases.events.dto.EventSubmissionCountDTO;
import yte.intern.eys.usecases.events.dto.EventSubmissionsPerDayDTO;
import yte.intern.eys.usecases.events.dto.QuestionAnswerDTO;
import yte.intern.eys.usecases.events.service.FeedBackService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/feedback")
public class FeedBackController {
    private final FeedBackService feedBackService;
    private final UserMapper userMapper;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{eventName}")
    public List<UserDTO> getApplicantsByEvent(@PathVariable(value= "eventName") String eventName) {
        return userMapper.mapToDto(feedBackService.getAllApplicants(eventName));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{eventName}/{username}")
    public List<QuestionAnswerDTO> getAnswers(@PathVariable(value= "eventName") String eventName, @PathVariable(value= "username") String username){
        return feedBackService.getQuestionsAnswers(username, eventName);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/SubmissionsPerEvent")
    public List<EventSubmissionCountDTO> getEventsSubmissionCounts() {
        return feedBackService.getEventsBySubmissionCount();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/EventsSubmissionCountPerDay/{eventName}")
    public List<EventSubmissionsPerDayDTO> getEventsSubmissionCountPerDay(@PathVariable(value= "eventName") String eventName) {
        return feedBackService.getSubmissionsPerDay(eventName);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/winner/{eventName}")
    public UserDTO getWinner(@PathVariable(value= "eventName") String eventName) {
        return feedBackService.getWinner(eventName);
    }



}
