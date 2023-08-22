package md.utm.farmbot.backend.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import java.util.Objects;
import javax.persistence.*;

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

    @Column(name = "NAME")
    private String fullname;

    @Column(name = "PERMISSION")
    private String permission;

    @Column(name = "AVATAR_ID")
    private Long avatarId;

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

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
