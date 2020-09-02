package yte.intern.eys.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TcKimlikNoValidator.class)
public @interface TcKimlikNo {

    String message() default "Turkish ID number is not valid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
