package md.utm.farmBot.servicecore.validation.constraints;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import md.utm.farmBot.servicecore.validation.CIFValidator;

@Constraint(validatedBy = CIFValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface CIF {

    String message() default "{md.utm.servicecore.validation.constraints.CIF.invalid}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
