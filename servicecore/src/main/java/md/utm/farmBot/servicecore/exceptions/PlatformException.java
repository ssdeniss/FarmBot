package md.utm.farmBot.servicecore.exceptions;

import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)  // 500
public class PlatformException extends RuntimeException {

    private static final String GLOBAL_FIELD = "_";

    @Getter
    private final HashMap<String, String> payload;

    public PlatformException() {
        super();
        payload = new HashMap<>();
    }

    public PlatformException(Throwable cause) {
        super(cause);
        payload = new HashMap<>();
    }

    public PlatformException(String message) {
        super(message);
        payload = new HashMap<>();
        payload.put(GLOBAL_FIELD, message);
    }

    public PlatformException(Map<String, String> payload) {
        this(payload.get(GLOBAL_FIELD));
        this.payload.putAll(payload);
    }

    public PlatformException(String message, Throwable cause) {
        super(message, cause);
        payload = new HashMap<>();
        payload.put(GLOBAL_FIELD, message);
    }

    public PlatformException(Map<String, String> payload, Throwable cause) {
        this(payload.get(GLOBAL_FIELD), cause);
        this.payload.putAll(payload);
    }

    public PlatformException(String message, Map<String, String> payload, Throwable cause) {
        this(message, cause);
        this.payload.putAll(payload);
        payload.put(GLOBAL_FIELD, message);
    }
}
