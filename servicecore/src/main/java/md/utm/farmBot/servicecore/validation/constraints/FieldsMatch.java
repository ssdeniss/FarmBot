package md.utm.farmBot.servicecore.validation.constraints;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

import md.utm.farmBot.servicecore.validation.FieldsMatchValidator;

@Constraint(validatedBy = FieldsMatchValidator.class)
@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Repeatable(FieldsMatch.List.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldsMatch {

    String first();

    String second();

    String message() default "md.utm.servicecore.validation.constraints.FieldsMatch.message";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    @Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface List {

        FieldsMatch[] value();
    }

}
