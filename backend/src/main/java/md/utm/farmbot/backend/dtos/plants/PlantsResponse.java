package md.utm.farmbot.backend.dtos.plants;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class PlantsResponse {
    private Long id;
    private Long typeId;
    private String name;
    private String description;
    private BigDecimal humidityMin;
    private BigDecimal humidityMax;
    private BigDecimal temperatureMin;
    private BigDecimal temperatureMax;
    private Long growingTime;
}
