package md.utm.farmbot.backend.dtos.taxonomies;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import md.utm.farmBot.servicecore.dto.SearchResult;
import md.utm.farmbot.backend.models.AppParameters;
import org.springframework.data.domain.Page;

import java.util.function.Function;

@Data
public class AppParametersListResponse extends SearchResult<AppParametersListResponse.Entity> {
    public AppParametersListResponse(Page<AppParameters> page, Function<AppParameters, AppParametersListResponse.Entity> mapper) {
        super(page, mapper);
    }

    @Getter
    @Setter
    public static class Entity {
        private Long id;
        private String code;
        private String name;
        private String value;
        private String description;
    }

}
