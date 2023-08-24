package md.utm.farmbot.backend.dtos.taxonomies;

import lombok.Data;

@Data
public class AppParametersResponse {
    private Long id;
    private String code;
    private String name;
    private String value;
    private String description;
}
