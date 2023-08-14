package md.utm.farmbot.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsernamePasswordCredentialsDTO {
    private String username;
    private String password;
}
