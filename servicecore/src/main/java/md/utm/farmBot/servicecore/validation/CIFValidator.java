package md.utm.farmBot.servicecore.validation;

import md.utm.farmBot.servicecore.validation.constraints.CIF;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

// https://ro.wikipedia.org/wiki/Cod_de_identificare_fiscal%C4%83
public class CIFValidator implements ConstraintValidator<CIF, String> {

    @Override
    public void initialize(CIF cnp) {
    }


    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return true;
    }
}
