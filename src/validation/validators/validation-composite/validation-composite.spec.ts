import { FieldValidationSpy } from "../../test/mock-field-validation";
import { ValidationComposite } from "./validation-composite";

type SutTypes = {
  sut: ValidationComposite,
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpies: FieldValidationSpy[] = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ];
  const sut = ValidationComposite.build(fieldValidationSpies);
  return { sut, fieldValidationSpies };
}

describe('ValidationComposite', () => {
  test('Should return error if field is empty', () => {
    const { sut, fieldValidationSpies } = makeSut();
    fieldValidationSpies[0].error = new Error('first_error');
    fieldValidationSpies[1].error = new Error('any_error_message');
    const error = sut.validate('any_field', { 'any_field': 'any_value' });
    expect(error).toBe('first_error');
  });
  
  test('Should return null if no error is found', () => {
    const { sut } = makeSut();
    const error = sut.validate('any_field', { 'any_field': 'any_value' });
    expect(error).toBeNull();
  });
})
