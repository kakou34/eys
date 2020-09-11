package yte.intern.eys.usecases.afterevent.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eys.usecases.afterevent.dto.SurveyQuestionDTO;
import yte.intern.eys.usecases.afterevent.mapper.SurveyAnswerMapper;
import yte.intern.eys.usecases.afterevent.service.SurveyService;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.afterevent.dto.SurveyQuestionDTO;
import yte.intern.eys.usecases.afterevent.entity.SurveyQuestion;
import yte.intern.eys.usecases.afterevent.dto.SurveyAnswerDTO;
import yte.intern.eys.usecases.events.mapper.EventMapper;
import yte.intern.eys.usecases.afterevent.mapper.SurveyQuestionMapper;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/survey")
public class SurveyController {
    private final SurveyQuestionMapper surveyQuestionMapper;
    private final SurveyAnswerMapper surveyAnswerMapper;
    private final SurveyService surveyService;
    
    //add survey question
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{eventName}/questions")
    public MessageResponse addQuestionToEvent(@PathVariable(value = "eventName") String name, @RequestBody @Valid SurveyQuestionDTO surveyQuestionDTO) {
        return surveyService.addSurveyQuestionToEvent(name, surveyQuestionMapper.mapToEntity(surveyQuestionDTO));
    }
    
    //delete survey question
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{eventName}/questions/{question}")
    public MessageResponse deleteSurveyQuestionFromEvent(@PathVariable(value = "eventName") String eventName, @PathVariable(value = "question") String question) {
        return surveyService.deleteQuestion(eventName, question);
    }
    
    //get all survey questions of an event 
    @GetMapping("/{eventName}/questions")
    public List<SurveyQuestionDTO> getEventsSurveyQuestions(@PathVariable(value = "eventName") String name) {
        Set<SurveyQuestion> surveyQuestions = surveyService.getEventsSurveyQuestions(name);
        return surveyQuestionMapper.mapToDto(new ArrayList<>(surveyQuestions));
    }
    
    //answer survey question
    @PostMapping("/{eventName}/{userName}/{question}")
    public MessageResponse answerSurveyQuestion(@PathVariable(value = "eventName") String eventName,
                                              @PathVariable(value = "userName") String userName,
                                              @PathVariable(value = "question") String question,
                                              @RequestBody String answer) {
        SurveyAnswerDTO surveyAnswerDTO = new SurveyAnswerDTO(answer);
        return surveyService.addAnswer(eventName, userName, question, surveyAnswerMapper.mapToEntity(surveyAnswerDTO));
    }

    //check if event has a survey
    @GetMapping("/{eventName}/hasSurvey")
    public boolean hasSurvey(@PathVariable(value = "eventName") String eventName) {
        return surveyService.hasSurvey(eventName);
    }
}
