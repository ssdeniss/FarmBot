package md.utm.farmbot.files.exceptions;

import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.exceptions.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Map;

@ControllerAdvice
@Slf4j
public class MaxUploadSizeExceededExceptionHandlera extends ResponseEntityExceptionHandler {
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public final ResponseEntity<Object> handleAllExceptions(MaxUploadSizeExceededException exc) throws BadRequestException {
        return new ResponseEntity<>(Map.of("message", exc.getMessage()), HttpStatus.BAD_REQUEST);
    }

}