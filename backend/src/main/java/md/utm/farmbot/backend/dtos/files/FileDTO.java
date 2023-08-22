package md.utm.farmbot.backend.dtos.files;

import lombok.Data;

import java.time.Instant;

@Data
public class FileDTO {
    private Long id;
    private String name;
    private String contentType;
    private Instant uploadDate;
    private Long size;
    private String storePath;
}
