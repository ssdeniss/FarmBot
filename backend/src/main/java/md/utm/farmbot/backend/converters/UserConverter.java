package md.utm.farmbot.backend.converters;

import md.utm.farmbot.backend.dtos.AuthenticatedUserResponse;
import md.utm.farmbot.backend.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserConverter {
    AuthenticatedUserResponse toAuthenticatedUserDto(User user);
}
