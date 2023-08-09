package md.utm.farmbot.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class PlatformException extends RuntimeException {
    private static final String GLOBAL_FIELD = "_";
    private final HashMap<String, String> payload;

    public PlatformException() {
        this.payload = new HashMap();
    }

    public PlatformException(Throwable cause) {
        super(cause);
        this.payload = new HashMap();
    }

    public PlatformException(String message) {
        super(message);
        this.payload = new HashMap();
        this.payload.put("_", message);
    }

    public PlatformException(Map<String, String> payload) {
        this((String)payload.get("_"));
        this.payload.putAll(payload);
    }

    public PlatformException(String message, Throwable cause) {
        super(message, cause);
        this.payload = new HashMap();
        this.payload.put("_", message);
    }

    public PlatformException(Map<String, String> payload, Throwable cause) {
        this((String)payload.get("_"), cause);
        this.payload.putAll(payload);
    }

    public PlatformException(String message, Map<String, String> payload, Throwable cause) {
        this(message, cause);
        this.payload.putAll(payload);
        payload.put("_", message);
    }

    public HashMap<String, String> getPayload() {
        return this.payload;
    }
}