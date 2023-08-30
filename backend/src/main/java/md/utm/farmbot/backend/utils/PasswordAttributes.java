package md.utm.farmbot.backend.utils;

import java.util.regex.Pattern;

public interface PasswordAttributes {
        // At least one Uppercase Letter && one Lowercase letter && one Digit
        Pattern PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$");
        Integer MIN_LENGTH = 6;

}
