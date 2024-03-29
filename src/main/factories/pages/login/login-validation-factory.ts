import { ValidationBuilder } from "../../../../validation/validators/builder/validation-builder";
import { ValidationComposite } from "../../../../validation/validators/validation-composite/validation-composite";

export function makeLoginValidation(): ValidationComposite {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(7).build()
  ]);
}
