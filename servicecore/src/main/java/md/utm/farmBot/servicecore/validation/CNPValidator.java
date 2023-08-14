package md.utm.farmBot.servicecore.validation;

import org.springframework.util.StringUtils;
import md.utm.farmBot.servicecore.validation.constraints.CNP;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.stream.IntStream;

// https://ro.wikipedia.org/wiki/Cod_numeric_personal_(Rom%C3%A2nia)
public class CNPValidator implements ConstraintValidator<CNP, String> {

    private static final int[] MASK = new int[]{2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9};

    @Override
    public void initialize(CNP cnp) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (StringUtils.hasText(value) && value.length() == 13 && value.matches("^[0-9]{13}$")) {
            var digits = value.chars().map(c -> c - '0').toArray();
            var sum = IntStream.range(0, MASK.length).map(idx -> digits[idx] * MASK[idx]).sum();
            var rest = sum % 11;
            var checksum = rest == 10 ? 1 : rest;

            return digits[MASK.length] == checksum;
        }

        return false;
    }
}
