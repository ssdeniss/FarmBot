package md.utm.farmbot.backend.converters;

import md.utm.farmbot.backend.dtos.taxonomies.PlantTypesListResponse;
import md.utm.farmbot.backend.dtos.taxonomies.PlantTypesRequest;
import md.utm.farmbot.backend.dtos.taxonomies.PlantTypesResponse;
import md.utm.farmbot.backend.models.PlantTypes;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlantTypesConverter {
    @Mapping(target = "id", ignore = true)
    PlantTypes toEntity(PlantTypesRequest request);

    PlantTypesResponse toResponse(PlantTypes entity);

    PlantTypesListResponse.Entity toListResponse(PlantTypes entity);
}
