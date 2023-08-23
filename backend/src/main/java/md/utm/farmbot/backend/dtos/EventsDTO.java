package md.utm.farmbot.backend.dtos;

import lombok.Data;
import md.utm.farmbot.backend.enums.EventMode;

import java.time.Instant;

@Data
public class EventsDTO {
    private Long id;
    private String title;
    private EventMode mode;
    private Long zoneId;
    private Instant date;
    private Boolean isDone;
}
