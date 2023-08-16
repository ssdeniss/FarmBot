package md.utm.farmbot.backend.dtos.taxonomies;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class PlantTypesRequest {
    @NotEmpty
    private String name;
    private String description;
}
