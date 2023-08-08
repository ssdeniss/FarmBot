package md.customs.frontiera.gateway.utils;

import java.util.function.Supplier;

public final class Consume {

    private Consume() {
        
    }

    public static <T> T exception(Supplier<T> supplier, T defaultValue) {
        try {
            return supplier.get();
        } catch (Exception ex) {
            return defaultValue;
        }
    }
}

