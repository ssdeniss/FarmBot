package md.utm.farmbot.backend.dtos.plants;

import lombok.Getter;
import lombok.Setter;
import md.utm.farmBot.servicecore.dto.SearchResult;
import md.utm.farmbot.backend.dtos.taxonomies.PlantTypesListResponse;
import md.utm.farmbot.backend.models.Plants;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.function.Function;

public class PlantsListResponse extends SearchResult<PlantsListResponse.Entity> {

    public PlantsListResponse(Page<Plants> page, Function<Plants, PlantsListResponse.Entity> mapper) {
        super(page, mapper);
    }

    @Getter
    @Setter
    public static class Entity {
        private Long id;
        private Long typeId;
        private String name;
        private String description;
        private BigDecimal humidityMin;
        private BigDecimal humidityMax;
        private BigDecimal temperatureMin;
        private BigDecimal temperatureMax;
    }
}
