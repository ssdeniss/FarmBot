package md.utm.farmbot.backend.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@ToString
@Entity
@Getter
@Accessors(chain = true)
@Setter
@EqualsAndHashCode
@Table(name = "FR_PLANTS")
public class Plants {
    @Id
    @Column(name = "ID", updatable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PLANT_TYPE_ID",  nullable = false)
    private Long typeId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "HUMIDITY_MIN")
    private BigDecimal humidityMin;

    @Column(name = "HUMIDITY_MAX")
    private BigDecimal humidityMax;

    @Column(name = "TEMPERATURE_MIN")
    private BigDecimal temperatureMin;

    @Column(name = "TEMPERATURE_MAX")
    private BigDecimal temperatureMax;

    @Column(name="GROWING_TIME")
    private Long growingTime;
}
