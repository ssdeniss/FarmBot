package md.utm.farmbot.backend.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import md.utm.farmbot.backend.enums.ZoneMode;

import javax.persistence.*;

@ToString
@Entity
@Getter
@Accessors(chain = true)
@Setter
@EqualsAndHashCode
@Table(name = "FR_ZONES")
public class Zones {
    @Id
    @Column(name = "ID", updatable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "PLANT_ID")
    private Plants plant;

    @Enumerated(EnumType.STRING)
    @Column(name = "MODE")
    private ZoneMode mode;

    @Column(name = "ADDRESS", unique = true)
    private Integer address;
}
