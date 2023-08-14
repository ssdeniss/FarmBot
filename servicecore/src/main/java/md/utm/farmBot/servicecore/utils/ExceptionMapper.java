package md.utm.farmBot.servicecore.utils;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.exceptions.ConflictException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;

@Slf4j
public class ExceptionMapper {

    private static final Map<String, Class<? extends PlatformException>> MAP = new HashMap<>();

    static {
        MAP.put("org.springframework.dao.DataIntegrityViolationException", ConflictException.class);
        MAP.put("org.hibernate.exception.ConstraintViolationException", ConflictException.class);
    }

    private ExceptionMapper() {
    }

    public static PlatformException map(Throwable ex) {
        if (ex instanceof PlatformException) {
            return (PlatformException) ex;
        }

        PlatformException result =
            Optional
                .ofNullable(MAP.get(ex.getClass().getName()))
                .map(clazz -> {
                    try {
                        return
                            clazz
                                .getDeclaredConstructor(String.class, Throwable.class)
                                .newInstance(ex.getMessage(), ex);
                    } catch (NoSuchMethodException | InstantiationException | InvocationTargetException |
                        IllegalAccessException e) {
                        log.warn(e.getMessage(), e);
                        return new PlatformException(ex);
                    }
                }).orElse(new PlatformException(ex));

        log.debug("Mapping exception of type {} to type {}", ex.getClass().getName(), result.getClass().getName());

        return result;
    }
}
