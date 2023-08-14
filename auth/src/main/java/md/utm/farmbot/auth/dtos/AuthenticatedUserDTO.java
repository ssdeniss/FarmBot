package md.utm.farmbot.auth.dtos;

import lombok.Data;
@Data
public class AuthenticatedUserDTO {
    private Long id;
    private String username;
    private String fullname;
}
