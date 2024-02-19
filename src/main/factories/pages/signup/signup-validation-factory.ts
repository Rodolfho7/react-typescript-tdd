import { ValidationBuilder } from "../../../../validation/validators/builder/validation-builder";
import { ValidationComposite } from "../../../../validation/validators/validation-composite/validation-composite";

export function makeSignUpValidation(): ValidationComposite {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(7).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().minLength(7).sameAs('password').build()
  ]);
}
