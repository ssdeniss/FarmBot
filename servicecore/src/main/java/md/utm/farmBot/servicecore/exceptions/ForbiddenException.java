package md.utm.farmBot.servicecore.exceptions;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// The user is authenticated but the resquested resource is not accessible

@ResponseStatus(value = HttpStatus.FORBIDDEN)  // 403
public class ForbiddenException extends PlatformException {

    public ForbiddenException() {
        super();
    }

    public ForbiddenException(Throwable cause) {
        super(cause);
    }

    public ForbiddenException(String message) {
        super(message);
    }

    public ForbiddenException(Map<String, String> payload) {
        super(payload);
    }

    public ForbiddenException(String message, Throwable cause) {
        super(message, cause);
    }

    public ForbiddenException(Map<String, String> payload, Throwable cause) {
        super(payload, cause);
    }

    public ForbiddenException(String message, Map<String, String> payload, Throwable cause) {
        super(message, payload, cause);
    }
}
