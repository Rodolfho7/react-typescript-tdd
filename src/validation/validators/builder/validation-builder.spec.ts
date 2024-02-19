import { CompareFieldsValidation } from "../compare-fields/compare-fields-validation";
import { EmailValidation } from "../email/email-validation";
import { MinLengthValidation } from "../min-length/min-length-validation";
import { RequiredFieldValidation } from "../required-field/required-field-validation";
import { ValidationBuilder } from "./validation-builder";

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  })

  test('Should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build();
    expect(validations).toEqual([new EmailValidation('any_field')]);
  })

  test('Should return MinLengthValidation', () => {
    const validations = ValidationBuilder.field('any_field').minLength(4).build();
    expect(validations).toEqual([new MinLengthValidation('any_field', 4)]);
  })

  test('Should return CompareFieldsValidation', () => {
    const validations = ValidationBuilder.field('any_field').sameAs('other_field').build();
    expect(validations).toEqual([new CompareFieldsValidation('any_field', 'other_field')]);
  })

  test('Should return a list of validations', () => {
    const validations = ValidationBuilder.field('any_field').required().email().minLength(4).build();
    expect(validations).toEqual([
      new RequiredFieldValidation('any_field'),
      new EmailValidation('any_field'),
      new MinLengthValidation('any_field', 4)
    ]);
  })
})
