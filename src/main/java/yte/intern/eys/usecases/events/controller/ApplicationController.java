package yte.intern.eys.usecases.events.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.FormAnswerDTO;
import yte.intern.eys.usecases.events.mapper.FormAnswerMapper;
import yte.intern.eys.usecases.events.service.ApplicationService;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/apply")
public class ApplicationController {
    private final ApplicationService applicationService;
    private final FormAnswerMapper formAnswerMapper;

    @PostMapping("/{eventName}/{userName}")
    public MessageResponse applyForEvent(@PathVariable(value = "eventName") String eventName, @PathVariable(value = "userName") String userName) {
        return applicationService.addSubmission(eventName, userName);
    }
    @PostMapping("/{eventName}/{userName}/{question}")
    public MessageResponse answerFormQuestion(@PathVariable(value = "eventName") String eventName,
                                              @PathVariable(value = "userName") String userName,
                                              @PathVariable(value = "question") String question,
                                              @RequestBody String answer) {
        FormAnswerDTO formAnswerDTO = new FormAnswerDTO(answer);
        return applicationService.addAnswer(eventName, userName, question, formAnswerMapper.mapToEntity(formAnswerDTO));
    }
}
