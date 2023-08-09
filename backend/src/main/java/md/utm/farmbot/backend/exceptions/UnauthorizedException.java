package md.utm.farmbot.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends PlatformException {
    public UnauthorizedException() {
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
