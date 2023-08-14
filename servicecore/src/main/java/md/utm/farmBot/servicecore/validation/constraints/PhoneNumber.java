package md.utm.farmBot.servicecore.validation.constraints;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import md.utm.farmBot.servicecore.validation.PhoneNumberValidator;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
public @interface PhoneNumber {

    String message() default
        "md.utm.servicecore.validation.constraints.PhoneNumber.message";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
