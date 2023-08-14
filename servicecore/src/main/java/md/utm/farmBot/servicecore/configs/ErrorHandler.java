package md.utm.farmBot.servicecore.configs;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.exceptions.PlatformException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Slf4j
public class ErrorHandler {

    @ExceptionHandler
    @ResponseBody
    public ResponseEntity<Object> handlePlatformExceptions(PlatformException platformException) {
        log.error("Handling Platform Exception: {}", platformException.getMessage(), platformException);

        int statusCode = platformException.getClass().getAnnotation(ResponseStatus.class).value().value();
        return ResponseEntity
            .status(statusCode)
            .body(Map.of(
                "timestamp", LocalDateTime.now(),
                "status", statusCode,
                "error", platformException.getClass().getName(),
                "message", platformException.getMessage() == null ? "(empty)" : platformException.getMessage(),
                "payload", platformException.getPayload() == null ? "(empty)" : platformException.getPayload()
            ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, String> handleBadRequestException(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getAllErrors()
            .stream()
            .filter(error -> error instanceof FieldError)
            .map(error -> Map.entry(
                    ((FieldError) error).getField(),
                    ObjectUtils.nullSafeToString(error.getDefaultMessage())
                )
            )
            .collect(
                Collectors.toMap(Entry::getKey, Entry::getValue, (value1, value2) -> value1)
            );
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public void handleAccessDeniedError(AccessDeniedException ex) {
        log.warn(ex.getMessage(), ex);
    }
}
