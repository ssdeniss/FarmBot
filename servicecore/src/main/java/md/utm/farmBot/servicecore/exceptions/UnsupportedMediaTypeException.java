package md.utm.farmBot.servicecore.exceptions;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNSUPPORTED_MEDIA_TYPE)  // 415
public class UnsupportedMediaTypeException extends PlatformException {

    public UnsupportedMediaTypeException() {
        super();
    }

    public UnsupportedMediaTypeException(Throwable cause) {
        super(cause);
    }

    public UnsupportedMediaTypeException(String message) {
        super(message);
    }

    public UnsupportedMediaTypeException(Map<String, String> payload) {
        super(payload);
    }

    public UnsupportedMediaTypeException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnsupportedMediaTypeException(Map<String, String> payload, Throwable cause) {
        super(payload, cause);
    }

    public UnsupportedMediaTypeException(String message, Map<String, String> payload, Throwable cause) {
        super(message, payload, cause);
    }
}
