package yte.intern.eys.authentication;

import org.mapstruct.Mapper;
import yte.intern.eys.authentication.entity.User;
import yte.intern.eys.usecases.events.dto.EventDTO;
import yte.intern.eys.usecases.events.entity.Event;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO mapToDto(User user);
    User mapToEntity(UserDTO userDTO);
    List<UserDTO> mapToDto(List<User> usersList);
    List<User> mapToEntity(List<UserDTO> userDTOList);
}
