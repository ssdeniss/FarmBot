package md.utm.farmBot.servicecore.exceptions;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)  // 404
public class DataNotFoundException extends PlatformException {

    public DataNotFoundException() {
        super();
    }

    public DataNotFoundException(Throwable cause) {
        super(cause);
    }

    public DataNotFoundException(String message) {
        super(message);
    }

    public DataNotFoundException(Map<String, String> payload) {
        super(payload);
    }

    public DataNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public DataNotFoundException(Map<String, String> payload, Throwable cause) {
        super(payload, cause);
    }

    public DataNotFoundException(String message, Map<String, String> payload, Throwable cause) {
        super(message, payload, cause);
    }
}
