package md.utm.farmbot.backend.dtos;

import lombok.Data;
import md.utm.farmbot.backend.enums.EventMode;

import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
public class EventsDTO {
    private Long id;
    private String title;
    @NotNull
    private EventMode mode;
    @NotNull
    private Long zoneId;
    @NotNull
    private Instant date;
    private Boolean isDone;
}
