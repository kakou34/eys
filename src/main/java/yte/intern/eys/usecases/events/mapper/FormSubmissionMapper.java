package yte.intern.eys.usecases.events.mapper;

import org.mapstruct.Mapper;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.dto.FormSubmissionDTO;
import yte.intern.eys.usecases.events.entity.Event;
import yte.intern.eys.usecases.events.entity.FormSubmission;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FormSubmissionMapper {
    FormSubmissionDTO mapToDto(FormSubmission formSubmission);
    FormSubmission mapToEntity(FormSubmissionDTO formSubmissionDTO);
    List<FormSubmissionDTO> mapToDto(List<FormSubmission> formSubmissionList);
    List<FormSubmission> mapToEntity(List<FormSubmissionDTO> formSubmissionDTOList);
}
