package md.utm.farmBot.servicecore.validation;

import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber.PhoneNumber.CountryCodeSource;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import md.utm.farmBot.servicecore.validation.constraints.PhoneNumber;
import org.apache.commons.lang3.StringUtils;

@Slf4j
public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {

    @Override
    public void initialize(PhoneNumber constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (StringUtils.isBlank(value)) {
            return true;
        }

        try {
            return PhoneNumberUtil
                .getInstance()
                .isPossibleNumber(
                    PhoneNumberUtil
                        .getInstance()
                        .parse(value, CountryCodeSource.UNSPECIFIED.name())
                );
        } catch (NumberParseException npe) {
            log.error(npe.getMessage(), npe);
        }

        return false;
    }
}
