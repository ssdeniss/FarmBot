package md.utm.farmbot.backend.dtos.files;

import lombok.Data;

@Data
public class Base64FileDTO {
    private String name;
    private String mimetype;
    private String content;
    private String path;
}
