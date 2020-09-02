package yte.intern.eys.usecases.events.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eys.usecases.common.dto.MessageResponse;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.mapper.EventMapper;
import yte.intern.eys.usecases.events.service.EventService;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/apply")
public class ApplicationController {


}
