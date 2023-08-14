package md.utm.farmBot.servicecore.validation;

import java.util.Objects;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.util.StringUtils;
import md.utm.farmBot.servicecore.validation.constraints.RequiredIfFieldEquals;

public class RequiredIfFieldEqualsValidator implements
    ConstraintValidator<RequiredIfFieldEquals, Object> {

    private String field;
    private String dependsOn;
    private String value;

    @Override
    public void initialize(RequiredIfFieldEquals constraintAnnotation) {
        this.field = constraintAnnotation.field();
        this.dependsOn = constraintAnnotation.dependsOn();
        this.value = constraintAnnotation.value();
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        if (obj == null) {
            return true;
        }

        BeanWrapperImpl wrapper = new BeanWrapperImpl(obj);

        Object refVal = wrapper.getPropertyValue(dependsOn);

        if (Objects.isNull(refVal)) {
            return true;
        }

        if (!Objects.equals(refVal.toString(), value)) {
            return true;
        }

        Object fieldVal = wrapper.getPropertyValue(field);
        var res = StringUtils.hasText(Objects.toString(fieldVal, ""));
        if (res) {
            return true;
        }

        context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
            .addPropertyNode(field)
            .addConstraintViolation();

        return false;
    }
}
