package md.utm.farmBot.servicecore.exceptions;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// The user is not authenticated
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)  // 401
public class UnauthorizedException extends PlatformException {

    public UnauthorizedException() {
        super();
    }

    public UnauthorizedException(Throwable cause) {
        super(cause);
    }

    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(Map<String, String> payload) {
        super(payload);
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnauthorizedException(Map<String, String> payload, Throwable cause) {
        super(payload, cause);
    }

    public UnauthorizedException(String message, Map<String, String> payload, Throwable cause) {
        super(message, payload, cause);
    }
}
