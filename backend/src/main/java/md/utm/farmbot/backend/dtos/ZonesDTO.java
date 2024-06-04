package md.utm.farmbot.backend.dtos;

import lombok.Data;
import md.utm.farmbot.backend.dtos.plants.PlantsRequest;
import md.utm.farmbot.backend.dtos.plants.PlantsResponse;
import md.utm.farmbot.backend.enums.ZoneMode;

import java.time.Instant;

@Data
public class ZonesDTO {
    private Long id;
    private PlantsResponse plant;
    private ZoneMode mode;
    private Integer address;
    private Instant plantDate;

}
