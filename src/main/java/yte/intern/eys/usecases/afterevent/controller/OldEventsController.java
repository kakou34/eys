package yte.intern.eys.usecases.afterevent.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yte.intern.eys.usecases.afterevent.service.OldEventsService;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.EventDTO;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/oldEvents")
public class OldEventsController {

    private final OldEventsService oldEventsService;


    @GetMapping("/byUser/{username}")
    public List<EventDTO> listOldEventsByUser(@PathVariable(value= "username") String username) {
        return oldEventsService.getOldEventsByUser(username);
    }

    @GetMapping("/getCertificate/{eventName}/{user}")
    public void getCertificate(@PathVariable(value= "eventName") String eventName, @PathVariable(value= "user") String user, HttpServletResponse response) throws IOException {
        byte [] certificate = oldEventsService.generateCertificate(user, eventName);
        response.setContentType("image/png");
        OutputStream outputStream = response.getOutputStream();
        outputStream.write(Objects.requireNonNull(certificate));
        outputStream.flush();
        outputStream.close();
    }

    @GetMapping(value = "/sendEmail/{eventName}/{userName}")
    public MessageResponse sendEmail(@PathVariable("eventName") String eventName, @PathVariable("userName") String username) throws IOException {
        return oldEventsService.sendCertificateViaEmail(eventName, username);
    }

}
