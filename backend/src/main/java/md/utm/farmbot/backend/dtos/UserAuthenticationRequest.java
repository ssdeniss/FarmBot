package md.utm.farmbot.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthenticationRequest {
    private String username;
    private String password;
    private Boolean remember = false;
}