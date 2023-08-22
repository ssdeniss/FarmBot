package md.utm.farmbot.files.dtos;
import lombok.Data;

@Data
public class Base64FileDto {
    private String name;
    private String mimetype;
    private String content;
    private String path; // optional
}
