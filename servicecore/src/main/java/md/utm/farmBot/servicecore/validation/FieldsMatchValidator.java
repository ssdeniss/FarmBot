package md.utm.farmBot.servicecore.validation;

import java.util.Objects;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapperImpl;
import md.utm.farmBot.servicecore.validation.constraints.FieldsMatch;

public class FieldsMatchValidator implements
    ConstraintValidator<FieldsMatch, Object> {

    private String first;
    private String second;

    @Override
    public void initialize(FieldsMatch constraintAnnotation) {
        this.first = constraintAnnotation.first();
        this.second = constraintAnnotation.second();
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        BeanWrapperImpl wrapper = new BeanWrapperImpl(obj);

        Object firstVal = wrapper.getPropertyValue(first);
        Object secondVal = wrapper.getPropertyValue(second);

        if (Objects.nonNull(firstVal) && Objects.nonNull(secondVal) && Objects.equals(firstVal, secondVal)) {
            return true;
        }

        context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
            .addPropertyNode(second)
            .addConstraintViolation();

        return false;
    }
}
