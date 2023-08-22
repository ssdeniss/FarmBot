package md.utm.farmbot.backend.dtos.taxonomies;

import lombok.Getter;
import lombok.Setter;
import md.utm.farmBot.servicecore.dto.SearchResult;
import md.utm.farmbot.backend.models.PlantTypes;
import org.springframework.data.domain.Page;

import java.util.function.Function;

public class PlantTypesListResponse extends SearchResult<PlantTypesListResponse.Entity> {
    public PlantTypesListResponse(Page<PlantTypes> page, Function<PlantTypes, Entity> mapper) {
        super(page, mapper);
    }

    @Getter
    @Setter
    public static class Entity {
        private Long id;
        private String name;
        private String description;
    }
}
