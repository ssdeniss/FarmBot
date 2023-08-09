package md.utm.farmbot.backend.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Objects;

@ToString
@Entity
@Getter
@Accessors(chain = true)
@Setter
@Table(name = "FR_USER")
public class User {
    @Id
    @Column(name = "ID", updatable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USERNAME", nullable = false)
    private String username;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || ((User) o).getId() == null || getClass() != o.getClass()) {
            return false;
        }

        User that = (User) o;
        return Objects.equals(id, that.id);
    }
}
