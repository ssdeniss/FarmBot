package md.utm.farmbot.backend.converters;

import md.utm.farmbot.backend.dtos.ZonesDTO;
import md.utm.farmbot.backend.dtos.plants.PlantsRequest;
import md.utm.farmbot.backend.models.Plants;
import md.utm.farmbot.backend.models.Zones;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ZonesConverter {
    Plants toPlant(PlantsRequest request);
    PlantsRequest toPlantDTO(Plants entity);
    @Mapping(target = "plant", ignore = true)
    Zones toZone(ZonesDTO dto);

    @Mapping(target = "plant", ignore = true)
    ZonesDTO toZoneDto(Zones zone);

    @AfterMapping
    default void setAdditionalDetails(@MappingTarget Zones zone, ZonesDTO dto) {
        if(dto.getPlant() != null) {
            zone.setPlant(toPlant(dto.getPlant()));
        }
    }

    @AfterMapping
    default void setAdditionalDetails(@MappingTarget ZonesDTO dto, Zones zone) {
        if(zone.getPlant() != null) {
            dto.setPlant(toPlantDTO(zone.getPlant()));
        }
    }
}
