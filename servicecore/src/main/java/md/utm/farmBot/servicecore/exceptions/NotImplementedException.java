package md.utm.farmBot.servicecore.exceptions;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.METHOD_NOT_ALLOWED)  // 405
public class NotImplementedException extends PlatformException {

    public NotImplementedException() {
        super();
    }

    public NotImplementedException(Throwable cause) {
        super(cause);
    }

    public NotImplementedException(String message) {
        super(message);
    }

    public NotImplementedException(Map<String, String> payload) {
        super(payload);
    }

    public NotImplementedException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotImplementedException(Map<String, String> payload, Throwable cause) {
        super(payload, cause);
    }

    public NotImplementedException(String message, Map<String, String> payload, Throwable cause) {
        super(message, payload, cause);
    }
}
