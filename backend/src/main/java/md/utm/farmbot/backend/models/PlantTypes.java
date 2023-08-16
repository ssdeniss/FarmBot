package md.utm.farmbot.backend.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;

@ToString
@Entity
@Getter
@Accessors(chain = true)
@Setter
@EqualsAndHashCode
@Table(name = "TAX_PLANT_TYPES")
public class PlantTypes {

    @Id
    @Column(name = "ID", updatable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;
}
