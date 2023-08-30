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
@Table(name = "TAX_APP_PARAMETERS")
public class AppParameters {
    @Id
    @Column(name = "ID", updatable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CODE", nullable = false)
    private String code;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "VALUE", nullable = false)
    private String value;

    @Column(name = "DESCRIPTION")
    private String description;
}
