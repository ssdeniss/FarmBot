package md.utm.farmbot.backend.converters;

import md.utm.farmbot.backend.dtos.plants.PlantsListResponse;
import md.utm.farmbot.backend.dtos.plants.PlantsRequest;
import md.utm.farmbot.backend.dtos.plants.PlantsResponse;
import md.utm.farmbot.backend.models.Plants;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlantsConverter {
    @Mapping(target = "id", ignore = true)
    Plants toEntity(PlantsRequest request);

    PlantsResponse toResponse(Plants entity);

    PlantsListResponse.Entity toListResponse(Plants entity);
}
