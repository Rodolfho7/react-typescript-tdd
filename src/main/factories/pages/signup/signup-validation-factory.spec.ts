import { ValidationBuilder } from "../../../../validation/validators/builder/validation-builder";
import { ValidationComposite } from "../../../../validation/validators/validation-composite/validation-composite";
import { makeSignUpValidation } from "./signup-validation-factory";

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const validationComposite = makeSignUpValidation();
    expect(validationComposite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().minLength(7).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().minLength(7).sameAs('password').build()
    ]));
  })
})
