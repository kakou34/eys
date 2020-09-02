package yte.intern.eys.usecases.events.mapper;

import org.mapstruct.Mapper;
import yte.intern.eys.usecases.events.dto.FormQuestionDTO;
import yte.intern.eys.usecases.events.entity.FormQuestion;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FormQuestionMapper {
    FormQuestionDTO mapToDto(FormQuestion formQuestion);
    FormQuestion mapToEntity(FormQuestionDTO formQuestionDTO);
    List<FormQuestionDTO> mapToDto(List<FormQuestion> formQuestionList);
    List<FormQuestion> mapToEntity(List<FormQuestionDTO> formQuestionDTOList);
}
