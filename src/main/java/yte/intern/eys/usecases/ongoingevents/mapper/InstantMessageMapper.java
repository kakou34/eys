package yte.intern.eys.usecases.ongoingevents.mapper;

import org.mapstruct.Mapper;
import yte.intern.eys.usecases.ongoingevents.dto.InstantMessageDTO;
import yte.intern.eys.usecases.ongoingevents.entity.InstantMessage;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InstantMessageMapper {
   InstantMessageDTO mapToDto(InstantMessage instantMessage);
    InstantMessage mapToEntity(InstantMessageDTO instantMessageDTO);
    List<InstantMessageDTO> mapToDto(List<InstantMessage> instantMessageList);
    List<InstantMessage> mapToEntity(List<InstantMessageDTO> instantMessageDTOList);
}
