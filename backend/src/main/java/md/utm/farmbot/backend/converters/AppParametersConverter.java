package md.utm.farmbot.backend.converters;

import md.utm.farmbot.backend.dtos.taxonomies.AppParametersListResponse;
import md.utm.farmbot.backend.dtos.taxonomies.AppParametersRequest;
import md.utm.farmbot.backend.dtos.taxonomies.AppParametersResponse;
import md.utm.farmbot.backend.models.AppParameters;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppParametersConverter {
    @Mapping(target = "id", ignore = true)
    AppParameters toEntity(AppParametersRequest request);

    AppParametersResponse toResponse(AppParameters entity);

    AppParametersListResponse.Entity toListResponse(AppParameters entity);
}
