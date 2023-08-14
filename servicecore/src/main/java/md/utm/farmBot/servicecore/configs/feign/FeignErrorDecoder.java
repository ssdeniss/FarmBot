package md.utm.farmBot.servicecore.configs.feign;

import feign.Response;
import feign.codec.ErrorDecoder;
import md.utm.farmBot.servicecore.exceptions.*;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@Primary
public class FeignErrorDecoder implements ErrorDecoder {
    public FeignErrorDecoder() {
    }

    public Exception decode(String methodKey, Response response) {
        switch (response.status()) {
            case 400:
                return new BadRequestException(response.body().toString());
            case 401:
                return new UnauthorizedException(response.body().toString());
            case 402:
            case 405:
            case 406:
            case 407:
            case 408:
            case 410:
            case 411:
            case 412:
            case 413:
            case 414:
            default:
                return new ResponseStatusException(HttpStatus.valueOf(response.status()), response.body().toString());
            case 403:
                return new ForbiddenException(response.body().toString());
            case 404:
                return new DataNotFoundException(response.body().toString());
            case 409:
                return new ConflictException(response.body().toString());
            case 415:
                return new UnsupportedMediaTypeException(response.body().toString());
        }
    }
}
