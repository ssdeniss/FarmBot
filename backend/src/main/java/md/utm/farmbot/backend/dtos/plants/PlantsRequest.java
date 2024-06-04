package md.utm.farmbot.backend.dtos.plants;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.Instant;

@Data
public class PlantsRequest {
    @NotNull
    private Long typeId;
    @NotEmpty
    private String name;
    private String description;
    private BigDecimal humidityMin;
    private BigDecimal humidityMax;
    private BigDecimal temperatureMin;
    private BigDecimal temperatureMax;
    private Long growingTime;

}
