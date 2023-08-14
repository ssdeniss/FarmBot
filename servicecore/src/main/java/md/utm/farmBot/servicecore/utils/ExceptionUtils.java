package md.utm.farmBot.servicecore.utils;

import io.vavr.control.Either;
import io.vavr.control.Try;
import java.util.function.Supplier;
import md.utm.farmBot.servicecore.exceptions.BadRequestException;
import md.utm.farmBot.servicecore.exceptions.PlatformException;

public class ExceptionUtils {

    private ExceptionUtils() {
    }

    public static <T> T consume(Supplier<T> function, T defaultValue) {
        return Try.ofSupplier(function).getOrElse(defaultValue);
    }

    public static <T> Either<PlatformException, T> trial(Supplier<T> function) {
        return trial(function, null);
    }

    public static <T> Either<PlatformException, T> trial(Supplier<T> function, String message) {
        return Try.ofSupplier(function)
            .map(Either::<PlatformException, T>right)
            .getOrElseGet(ex -> Either.left(
                message == null ? ExceptionMapper.map(ex) : new BadRequestException(message, ex)
            ));
    }

}
