package md.utm.farmBot.servicecore.exceptions;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)  // 409
public class ConflictException extends PlatformException {

    public ConflictException() {
        super();
    }

    public ConflictException(Throwable cause) {
        super(cause);
    }

    public ConflictException(String message) {
        super(message);
    }

    public ConflictException(Map<String, String> payload) {
        super(payload);
    }

    public ConflictException(String message, Throwable cause) {
        super(message, cause);
    }

    public ConflictException(Map<String, String> payload, Throwable cause) {
        super(payload, cause);
    }

    public ConflictException(String message, Map<String, String> payload, Throwable cause) {
        super(message, payload, cause);
    }
}
