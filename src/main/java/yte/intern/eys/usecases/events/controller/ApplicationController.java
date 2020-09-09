package yte.intern.eys.usecases.events.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.FormAnswerDTO;
import yte.intern.eys.usecases.events.mapper.FormAnswerMapper;
import yte.intern.eys.usecases.events.service.ApplicationService;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.Objects;

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

    @DeleteMapping("/{eventName}/{userName}")
    public MessageResponse deleteSubmission(@PathVariable(value = "eventName") String eventName, @PathVariable(value = "userName") String userName) {
        return applicationService.deleteSubmission(eventName, userName);
    }
    @PostMapping("/{eventName}/{userName}/{question}")
    public MessageResponse answerFormQuestion(@PathVariable(value = "eventName") String eventName,
                                              @PathVariable(value = "userName") String userName,
                                              @PathVariable(value = "question") String question,
                                              @RequestBody String answer) {
        FormAnswerDTO formAnswerDTO = new FormAnswerDTO(answer);
        return applicationService.addAnswer(eventName, userName, question, formAnswerMapper.mapToEntity(formAnswerDTO));
    }

    @GetMapping(value = "/{eventName}/{userName}/qrcode")
    public void qrcode(@PathVariable("eventName") String eventName, @PathVariable("userName") String username, HttpServletResponse response) throws Exception {
        byte [] qrCode = applicationService.getQrCode(eventName, username);
        response.setContentType("image/png");
        OutputStream outputStream = response.getOutputStream();
        outputStream.write(Objects.requireNonNull(qrCode));
        outputStream.flush();
        outputStream.close();
    }
    @GetMapping(value = "/{eventName}/{userName}/sendEmail")
    public MessageResponse sendEmail(@PathVariable("eventName") String eventName, @PathVariable("userName") String username) {
        return applicationService.sendQrCodeViaEmail(eventName, username);
    }


}
