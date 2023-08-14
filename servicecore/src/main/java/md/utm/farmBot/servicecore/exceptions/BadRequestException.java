package md.utm.farmBot.servicecore.exceptions;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)  // 400
public class BadRequestException extends PlatformException {

    public BadRequestException() {
        super();
    }

    public BadRequestException(Throwable cause) {
        super(cause);
    }

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(Map<String, String> payload) {
        super(payload);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }

    public BadRequestException(Map<String, String> payload, Throwable cause) {
        super(payload, cause);
    }

    public BadRequestException(String message, Map<String, String> payload, Throwable cause) {
        super(message, payload, cause);
    }
}
