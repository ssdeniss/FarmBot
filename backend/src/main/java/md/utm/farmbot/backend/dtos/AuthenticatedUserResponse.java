package md.utm.farmbot.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticatedUserResponse {
    private Long id;
    private String username;
    private String fullname;
}
