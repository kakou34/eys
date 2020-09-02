package yte.intern.eys.usecases.events.mapper;

import org.mapstruct.Mapper;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.Event;
import java.util.List;

@Mapper(componentModel = "spring")
public interface EventMapper {
    EventDTO mapToDto(Event event);
    Event mapToEntity(EventDTO eventDTO);
    List<EventDTO> mapToDto(List<Event> studentList);
    List<Event> mapToEntity(List<EventDTO> studentDTOList);
}