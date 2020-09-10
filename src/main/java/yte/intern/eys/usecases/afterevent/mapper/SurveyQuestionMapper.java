package yte.intern.eys.usecases.afterevent.mapper;
import org.mapstruct.Mapper;
import yte.intern.eys.usecases.afterevent.dto.SurveyQuestionDTO;
import yte.intern.eys.usecases.afterevent.entity.SurveyQuestion;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SurveyQuestionMapper {
    SurveyQuestionDTO mapToDto(SurveyQuestion SurveyQuestion);
    SurveyQuestion mapToEntity(SurveyQuestionDTO SurveyQuestionDTO);
    List<SurveyQuestionDTO> mapToDto(List<SurveyQuestion> SurveyQuestionList);
    List<SurveyQuestion> mapToEntity(List<SurveyQuestionDTO> SurveyQuestionDTOList);
}
