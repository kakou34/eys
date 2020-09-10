package yte.intern.eys.usecases.afterevent.mapper;

import org.mapstruct.Mapper;
import yte.intern.eys.usecases.afterevent.dto.SurveyAnswerDTO;
import yte.intern.eys.usecases.afterevent.entity.SurveyAnswer;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SurveyAnswerMapper {
    SurveyAnswerDTO mapToDto(SurveyAnswer SurveyAnswer);
    SurveyAnswer mapToEntity(SurveyAnswerDTO SurveyAnswerDTO);
    List<SurveyAnswerDTO> mapToDto(List<SurveyAnswer> SurveyAnswerList);
    List<SurveyAnswer> mapToEntity(List<SurveyAnswerDTO> SurveyAnswerDTOList);
}
