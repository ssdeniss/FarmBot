package md.utm.farmbot.backend.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import md.utm.farmbot.backend.enums.EventMode;

import javax.persistence.*;
import java.time.Instant;

@ToString
@Entity
@Getter
@Accessors(chain = true)
@Setter
@EqualsAndHashCode
@Table(name = "FR_EVENTS")
public class Events {
    @Id
    @Column(name = "ID", updatable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TITLE")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "MODE")
    private EventMode mode;

    @Column(name = "ZONE_ID")
    private Long zoneId;

    @Column(name = "EXECUTE_AT")
    private Instant date;

    @Column(name = "IS_DONE")
    private Boolean isDone;
}
