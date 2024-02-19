import { ValidationBuilder } from "../../../../validation/validators/builder/validation-builder";
import { ValidationComposite } from "../../../../validation/validators/validation-composite/validation-composite";
import { makeLoginValidation } from "./login-validation-factory"

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const validationComposite = makeLoginValidation();
    expect(validationComposite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().minLength(7).build()
    ]));
  })
})