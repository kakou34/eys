package yte.intern.eys.usecases.events.mapper;

import org.mapstruct.Mapper;
import yte.intern.eys.usecases.events.dto.FormAnswerDTO;
import yte.intern.eys.usecases.events.entity.FormAnswer;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FormAnswerMapper {
    FormAnswerDTO mapToDto(FormAnswer formAnswer);
    FormAnswer mapToEntity(FormAnswerDTO formAnswerDTO);
    List<FormAnswerDTO> mapToDto(List<FormAnswer> formAnswerList);
    List<FormAnswer> mapToEntity(List<FormAnswerDTO> formAnswerDTOList);
}
