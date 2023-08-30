package md.utm.farmbot.backend.dtos.taxonomies;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class AppParametersRequest {
    private Long id;
    @NotEmpty
    private String code;
    @NotEmpty
    private String name;
    @NotEmpty
    private String value;
    private String description;
}
